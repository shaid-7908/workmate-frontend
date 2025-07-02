import React, { useEffect } from "react";
import FabricCanvas from "./fabric/canvas";
import Artboard from "./fabric/artboard";
import { ADD_PREFIX, DESIGN_RESIZE, HISTORY_UNDO, HISTORY_REDO, dispatcher, filter } from "@/global";
import { addEventListeners, removeEventListeners } from "./events";
import { createItem } from "./fabric/utils/create-item";
import { EventBusData } from "@/interfaces/rxjs";
import { FabricObject } from "fabric";
import { useUndoRedo } from "./hooks/use-undo-redo";

const Canvas = () => {
  const canvasElRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<FabricCanvas>(null);
  const artboardRef = React.useRef<Artboard | null>(null); // ✅ strongly typed

  // Initialize undo/redo functionality
  const { undo, redo, canUndo, canRedo } = useUndoRedo(canvasRef);

  useEffect(() => {
    const canvasWrapper = containerRef.current as HTMLDivElement;

    const canvasWrapperWidth = canvasWrapper.offsetWidth;
    const canvasWrapperHeight = canvasWrapper.offsetHeight;

    FabricObject.ownDefaults.borderColor = "blue";
    FabricObject.ownDefaults.cornerColor = "white";
    FabricObject.ownDefaults.cornerStrokeColor = "#c0c0c0";
    FabricObject.ownDefaults.borderOpacityWhenMoving = 1;
    FabricObject.ownDefaults.borderScaleFactor = 1;
    FabricObject.ownDefaults.cornerSize = 8;
    FabricObject.ownDefaults.cornerStyle = "rect";
    FabricObject.ownDefaults.centeredScaling = false;
    FabricObject.ownDefaults.centeredRotation = true;
    FabricObject.ownDefaults.transparentCorners = false;

    const canvas = new FabricCanvas(canvasElRef.current, {
      width: canvasWrapperWidth,
      height: canvasWrapperHeight,
      preserveObjectStacking: true,
      selectionColor: "rgba(52, 152, 219,0.1)",
      selectionBorderColor: "rgba(52, 152, 219,1.0)",
      
    });

    addEventListeners(canvas);
    canvasRef.current = canvas;

    const size = {
      width: 600,
      height: 600,
    };

    const artboard = new Artboard({
      width: size.width,
      height: size.height,
    });
    artboardRef.current = artboard;
    (canvas as any).add(artboard);
    canvas.centerArtboards();

    return () => {
      removeEventListeners(canvas);
      canvas.dispose();
    };
  }, []);

  const handleAddRemoveEvents = async (object: EventBusData) => {
    console.log(object ,'item to be added')
    const item = await createItem(object);
    console.log(item,'after addition')
    if (item) {
      (canvasRef.current as any)?.add(item);
    }
  };

    useEffect(() => {
    const editEvents = dispatcher.bus.pipe(
      filter(({ key }) => key.startsWith('edit:'))
    );
    const subscription = editEvents.subscribe(({ val }) => {
      // Find the selected object on the canvas
      // Apply val.payload.details to it
      // Request canvas re-render
      console.log(val,'edit event')
      const canvas = canvasRef.current;
      const selection = canvas?.getActiveObject();
      if(selection){
        const details = val.payload.details;
        const {fontFamily,fontUrl} = details;
        selection.set({
          fontFamily,
          fontUrl
        })
        canvas?.requestRenderAll();
        console.log(selection,'selection object from main canvas')
      }

    });
    return () => subscription.unsubscribe();
  }, []);

  // ✅ Listen for ADD_* events
  useEffect(() => {
    const stateEvents = dispatcher.bus.pipe(
      filter(({ key }) => key.startsWith(ADD_PREFIX)),
    );

    const subscription = stateEvents.subscribe((object) => {
      handleAddRemoveEvents(object);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Listen for DESIGN_RESIZE events
  useEffect(() => {
    const resizeEvents = dispatcher.bus.pipe(
      filter(({ key }) => key === DESIGN_RESIZE),
    );

    const subscription = resizeEvents.subscribe(({ val }) => {
      const payload = val?.payload;
      const artboard = artboardRef.current;
      const canvas = canvasRef.current;

      if (!payload || !artboard || !canvas) return;

      artboard.set({
        width: payload.width,
        height: payload.height,
      });
      artboard.setCoords(); // update transform controls
      (canvas as any).requestRenderAll(); // redraw
      canvas.centerArtboards(); // re-center if needed
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Listen for HISTORY_UNDO events
  useEffect(() => {
    const undoEvents = dispatcher.bus.pipe(
      filter(({ key }) => key === HISTORY_UNDO),
    );

    const subscription = undoEvents.subscribe(() => {
      if (canvasRef.current?.canUndo()) {
        canvasRef.current.undo();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Listen for HISTORY_REDO events
  useEffect(() => {
    const redoEvents = dispatcher.bus.pipe(
      filter(({ key }) => key === HISTORY_REDO),
    );

    const subscription = redoEvents.subscribe(() => {
      if (canvasRef.current?.canRedo()) {
        canvasRef.current.redo();
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <div ref={containerRef} className="flex-1 bg-gray-900">
      <canvas ref={canvasElRef} />
    </div>
  );
};

export default Canvas;
