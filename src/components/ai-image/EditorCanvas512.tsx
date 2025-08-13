import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { FabricImage, Line } from "fabric";
import { ADD_IMAGE, HISTORY_REDO, HISTORY_UNDO, dispatcher, filter } from "@/global";

interface EditorCanvas512Props {
  className?: string;
  backgroundColor?: string;
}

const EditorCanvas512: React.FC<EditorCanvas512Props> = ({
  className,
  backgroundColor = "#0b0f19",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const vGuideRef = useRef<Line | null>(null);
  const hGuideRef = useRef<Line | null>(null);
  const isRestoringRef = useRef(false);
  const undoStackRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const maxHistory = 50;
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 512,
      height: 512,
      preserveObjectStacking: true,
      backgroundColor,
      selection: true,
    });

    fabricRef.current = canvas;

    // Add center guides (hidden by default)
    const vGuide = new fabric.Line([256, 0, 256, 512], {
      stroke: "#84cc16",
      strokeWidth: 1,
      selectable: false,
      evented: false,
      visible: false,
      excludeFromExport: true,
    });
    const hGuide = new fabric.Line([0, 256, 512, 256], {
      stroke: "#84cc16",
      strokeWidth: 1,
      selectable: false,
      evented: false,
      visible: false,
      excludeFromExport: true,
    });
    vGuideRef.current = vGuide;
    hGuideRef.current = hGuide;
    canvas.add(vGuide);
    canvas.add(hGuide);

    const saveState = () => {
      if (isRestoringRef.current) return;
      const json = JSON.stringify(canvas.toJSON());
      undoStackRef.current.push(json);
      if (undoStackRef.current.length > maxHistory) undoStackRef.current.shift();
      // clear redo chain on new action
      redoStackRef.current = [];
      setCanUndo(undoStackRef.current.length > 0);
      setCanRedo(redoStackRef.current.length > 0);
    };

    // Save initial empty state
    saveState();

    const SNAP_THRESHOLD = 6;
    const showGuides = (showV: boolean, showH: boolean) => {
      if (vGuideRef.current) vGuideRef.current.set({ visible: showV });
      if (hGuideRef.current) hGuideRef.current.set({ visible: showH });
      canvas.requestRenderAll();
    };

    const onObjectMoving = (e: any) => {
      const obj = e.target as fabric.Object | undefined;
      if (!obj) return;
      const objW = obj.getScaledWidth();
      const objH = obj.getScaledHeight();
      const centerX = (obj.left || 0) + objW / 2;
      const centerY = (obj.top || 0) + objH / 2;
      let snappedV = false;
      let snappedH = false;
      if (Math.abs(centerX - 256) <= SNAP_THRESHOLD) {
        obj.set({ left: 256 - objW / 2 });
        snappedV = true;
      }
      if (Math.abs(centerY - 256) <= SNAP_THRESHOLD) {
        obj.set({ top: 256 - objH / 2 });
        snappedH = true;
      }
      showGuides(snappedV, snappedH);
    };

    const onObjectModified = () => {
      showGuides(false, false);
      saveState();
    };

    const onObjectAddedOrRemoved = () => {
      saveState();
    };

    canvas.on("object:moving", onObjectMoving as any);
    canvas.on("object:modified", onObjectModified);
    canvas.on("object:added", onObjectAddedOrRemoved);
    canvas.on("object:removed", onObjectAddedOrRemoved);

    return () => {
      canvas.off("object:moving", onObjectMoving);
      canvas.off("object:modified", onObjectModified);
      canvas.off("object:added", onObjectAddedOrRemoved);
      canvas.off("object:removed", onObjectAddedOrRemoved);
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [backgroundColor]);

  // Listen to global ADD_IMAGE bus to add into this canvas
  useEffect(() => {
    const subscription = dispatcher.bus
      .pipe(filter(({ key }) => key === ADD_IMAGE))
      .subscribe(({ val }) => {
        const src: string | undefined = val?.payload?.details?.src;
        if (!src) return;
        FabricImage.fromURL(src).then((img) => {
          const canvas = fabricRef.current;
          if (!canvas || !img) return;
          const maxW = 480;
          const maxH = 480;
          const scaleX = maxW / (img.width || maxW);
          const scaleY = maxH / (img.height || maxH);
          const scale = Math.min(scaleX, scaleY, 1);
          img.set({
            left: (512 - (img.width || 0) * scale) / 2,
            top: (512 - (img.height || 0) * scale) / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: true,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.requestRenderAll();
        });
      });
    return () => subscription.unsubscribe();
  }, []);

  // Global undo/redo events
  useEffect(() => {
    const subUndo = dispatcher.bus
      .pipe(filter(({ key }) => key === HISTORY_UNDO))
      .subscribe(() => handleUndo());
    const subRedo = dispatcher.bus
      .pipe(filter(({ key }) => key === HISTORY_REDO))
      .subscribe(() => handleRedo());
    return () => {
      subUndo.unsubscribe();
      subRedo.unsubscribe();
    };
  }, []);

  const restoreFrom = (json: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    isRestoringRef.current = true;
    canvas.loadFromJSON(json, () => {
      isRestoringRef.current = false;
      canvas.requestRenderAll();
    });
  };

  const handleUndo = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    if (undoStackRef.current.length <= 1) return; // first is current
    const current = undoStackRef.current.pop();
    if (!current) return;
    redoStackRef.current.push(current);
    const prev = undoStackRef.current[undoStackRef.current.length - 1];
    if (prev) restoreFrom(prev);
    setCanUndo(undoStackRef.current.length > 1);
    setCanRedo(redoStackRef.current.length > 0);
  };

  const handleRedo = () => {
    const next = redoStackRef.current.pop();
    if (!next) return;
    // push current state before restoring
    const canvas = fabricRef.current;
    if (!canvas) return;
    const current = JSON.stringify(canvas.toJSON());
    undoStackRef.current.push(current);
    restoreFrom(next);
    setCanUndo(undoStackRef.current.length > 1);
    setCanRedo(redoStackRef.current.length > 0);
  };

  const handleDelete = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  // Delete key support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        handleDelete();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        handleRedo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addImageFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const url = String(e.target?.result || "");
      if (!url) return;
      const img = await FabricImage.fromURL(url);
      const canvas = fabricRef.current;
      if (!canvas) return;

      // scale to fit inside 512x512 while keeping aspect ratio
      const maxW = 480;
      const maxH = 480;
      const scaleX = maxW / (img.width || maxW);
      const scaleY = maxH / (img.height || maxH);
      const scale = Math.min(scaleX, scaleY, 1);
      img.set({
        left: (512 - (img.width || 0) * scale) / 2,
        top: (512 - (img.height || 0) * scale) / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) addImageFromFile(file);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) addImageFromFile(file);
    };

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragLeave);
    container.addEventListener("drop", handleDrop);

    return () => {
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragleave", handleDragLeave);
      container.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div className="mb-2 flex items-center justify-between">
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-300">
          <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
          <span className="rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-gray-200 hover:bg-gray-900">
            Upload Image
          </span>
          <span className="text-gray-500">or drag & drop</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-gray-200 disabled:opacity-40 hover:bg-gray-900"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-gray-200 disabled:opacity-40 hover:bg-gray-900"
          >
            Redo
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-gray-200 hover:bg-gray-900"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} className="rounded-md ring-1 ring-lime-400/60" />
        {isDraggingOver && (
          <div className="pointer-events-none absolute inset-0 rounded-md border-2 border-dashed border-lime-400/60 bg-lime-400/10" />
        )}
      </div>
    </div>
  );
};

export default EditorCanvas512;


