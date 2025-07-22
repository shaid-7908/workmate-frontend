import React, { useEffect } from "react";
import FabricCanvas from "./fabric/canvas";
import Artboard from "./fabric/artboard";
import { ADD_PREFIX, DESIGN_RESIZE, HISTORY_UNDO, HISTORY_REDO, dispatcher, filter } from "@/global";
import { addEventListeners, removeEventListeners } from "./events";
import { createItem } from "./fabric/utils/create-item";
import { EventBusData } from "@/interfaces/rxjs";
import { FabricObject, Shadow } from "fabric";
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
      console.log('Edit event received:', val);
      const canvas = canvasRef.current;
      const selection = canvas?.getActiveObject();
      console.log(selection,'selection object from main canvas')
      if(selection){
        const details = val.payload.details;
        console.log('Edit details:', details);
        const {fontFamily, fontUrl, textAlign, fontSize, color, strokeColor, shadowColor, shadowX, shadowY, shadowBlur, backgroundColor} = details;
        
        // Handle shadow properties
        let shadow = null;
        let shouldRemoveShadow = false;
        
        // Check if we have any meaningful shadow values (non-zero or color)
        const hasShadowColor = shadowColor && shadowColor !== '#000000';
        const hasShadowOffset = (shadowX !== undefined && shadowX !== 0) || (shadowY !== undefined && shadowY !== 0);
        const hasShadowBlur = shadowBlur !== undefined && shadowBlur !== 0;
        const hasShadowValues = hasShadowOffset || hasShadowBlur; // Remove hasShadowColor from this check since we always have a color
        
        console.log('Shadow detection:', {
          hasShadowColor,
          hasShadowOffset,
          hasShadowBlur,
          hasShadowValues
        });
        
        // Check if we're explicitly setting all values to zero (indicating shadow removal)
        const isExplicitZero = (shadowX === 0 && shadowY === 0 && shadowBlur === 0) || 
                              (shadowX === 0 && shadowY === 0 && shadowBlur === 0 && shadowColor === '#000000');
        
        console.log('Shadow values:', { 
          shadowColor, 
          shadowX, 
          shadowY, 
          shadowBlur, 
          hasShadowColor,
          hasShadowOffset,
          hasShadowBlur,
          hasShadowValues,
          isExplicitZero
        });
        
        if (hasShadowValues) {
          try {
            // Convert hex color to rgba for Fabric.js shadow
            let shadowColorRgba = 'rgba(0,0,0,0.3)';
            if (shadowColor) {
              try {
                // Convert hex to rgba
                const hex = shadowColor.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                shadowColorRgba = `rgba(${r},${g},${b},0.3)`;
                console.log('Converted shadow color:', shadowColorRgba);
              } catch (error) {
                console.error('Error converting shadow color:', error);
                shadowColorRgba = 'rgba(0,0,0,0.3)';
              }
            }
            
            // Ensure all values are valid numbers
            const blur = typeof shadowBlur === 'number' ? shadowBlur : 0;
            const offsetX = typeof shadowX === 'number' ? shadowX : 0;
            const offsetY = typeof shadowY === 'number' ? shadowY : 0;
            
            shadow = new Shadow({
              color: shadowColorRgba,
              blur: blur,
              offsetX: offsetX,
              offsetY: offsetY,
              affectStroke: false,
              nonScaling: false
            });
            console.log('Created shadow object:', shadow);
          } catch (error) {
            console.error('Error creating shadow object:', error);
            shadow = null;
          }
        } else if (isExplicitZero) {
          // Explicitly remove shadow when all values are set to zero
          shouldRemoveShadow = true;
          console.log('Explicitly removing shadow - all values set to zero');
        }
        // If no shadow values and not explicit zero, don't touch shadow
        
        const updateData: any = {
          ...(fontFamily && { fontFamily }),
          ...(fontUrl && { fontUrl }),
          ...(textAlign && { textAlign }),
          ...(fontSize && { fontSize }),
          ...(color && { fill: color }),
          ...(strokeColor && { stroke: strokeColor }),
          ...(backgroundColor && backgroundColor !== 'transparent' && { backgroundColor }),
        };
        
        // Handle shadow in update data
        if (shadow !== null) {
          updateData.shadow = shadow;
        } else if (shouldRemoveShadow) {
          // Explicitly set shadow to null to remove it
          updateData.shadow = null;
        }
        // If shadow is null and not explicitly removing, don't include shadow in updateData
        
        console.log('Update data:', updateData);
        
        try {
          selection.set(updateData);
          canvas?.requestRenderAll();
          console.log('Selection after update:', selection);
          console.log('Selection shadow:', selection.shadow);
        } catch (error) {
          console.error('Error updating selection:', error);
          // Try to restore the selection if it was lost
          if (!selection || !selection.visible) {
            console.log('Selection was lost, attempting to restore...');
            // You might need to implement a way to restore the selection
          }
        }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const canvas = canvasRef.current;
        if (canvas) {
          const activeObject = canvas.getActiveObject();
          if (activeObject && activeObject.type !== 'Artboard') {
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="flex-1 bg-gray-900">
      <canvas ref={canvasElRef} />
    </div>
  );
};

export default Canvas;
