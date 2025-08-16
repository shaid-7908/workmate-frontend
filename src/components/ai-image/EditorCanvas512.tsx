import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import * as fabric from "fabric";
import { FabricImage, Line } from "fabric";
import { ADD_IMAGE, HISTORY_REDO, HISTORY_UNDO, dispatcher, filter } from "@/global";
import { GetImageProxy } from "@/api/imageapi";

export interface EditorCanvas512Handle {
  exportBase64PNG: (options?: { multiplier?: number; transparent?: boolean }) => string | null;
}

interface EditorCanvas512Props {
  className?: string;
  backgroundColor?: string;
}

const EditorCanvas512 = forwardRef<EditorCanvas512Handle, EditorCanvas512Props>(({ className, backgroundColor = "#0b0f19" }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const vGuideRef = useRef<Line | null>(null);
  const hGuideRef = useRef<Line | null>(null);
  const isRestoringRef = useRef(false);
  const undoStackRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const maxHistory = 50;
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
      .subscribe(async ({ val }) => {
        let src: string | undefined = val?.payload?.details?.src;
        if (!src) return;

        // Try to avoid CORS taint by converting to data URL when remote
        if (/^https?:/i.test(src)) {
          try {
            const res = await fetch(src, { mode: "cors" });
            const blob = await res.blob();
            src = await new Promise<string>((resolve) => {
              const fr = new FileReader();
              fr.onload = () => resolve(String(fr.result));
              fr.readAsDataURL(blob);
            });
          } catch (e) {
            console.warn("Direct fetch failed due to CORS, trying proxy...", e);
            // Try using backend proxy for CORS-blocked images
            try {
              const blob = await GetImageProxy(src);
              src = await new Promise<string>((resolve) => {
                const fr = new FileReader();
                fr.onload = () => resolve(String(fr.result));
                fr.readAsDataURL(blob);
              });
            } catch (proxyError) {
              console.error("Proxy fetch also failed:", proxyError);
              // Last fallback: try direct load with crossOrigin (may not work for canvas export)
            }
          }
        }

        FabricImage.fromURL(src, { crossOrigin: "anonymous" as any }).then((img) => {
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

  const exportBase64PNGInternal = (options?: { multiplier?: number; transparent?: boolean }): string | null => {
    const canvas = fabricRef.current;
    if (!canvas) return null;
    const originalBg = (canvas as any).backgroundColor;
    if (options?.transparent) {
      (canvas as any).backgroundColor = "rgba(0,0,0,0)";
    }
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: options?.multiplier ?? 2 });
    (canvas as any).backgroundColor = originalBg;
    canvas.requestRenderAll();
    return dataUrl;
  };

  useImperativeHandle(ref, () => ({
    exportBase64PNG: (options) => exportBase64PNGInternal(options),
  }), []);

  const handleExportPNG = () => {
    const dataUrl = exportBase64PNGInternal({ multiplier: 2, transparent: true });
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Upload and drag-drop are intentionally disabled here; images come via sidebar using ADD_IMAGE.

  return (
    <div className={className}>
      <div className="relative inline-block">
        <canvas ref={canvasRef} className="rounded-md ring-1 ring-lime-400/60" />
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end gap-2 p-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="rounded-md border border-gray-800 bg-gray-950/80 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm disabled:opacity-40 hover:bg-gray-900"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="rounded-md border border-gray-800 bg-gray-950/80 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm disabled:opacity-40 hover:bg-gray-900"
          >
            Redo
          </button>
          <button
            onClick={handleExportPNG}
            className="rounded-md border border-gray-800 bg-gray-950/80 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm hover:bg-gray-900"
          >
            Export PNG
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md border border-gray-800 bg-gray-950/80 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm hover:bg-gray-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

EditorCanvas512.displayName = "EditorCanvas512";

export default EditorCanvas512;


