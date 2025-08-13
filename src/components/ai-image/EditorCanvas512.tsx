import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { FabricImage } from "fabric";
import { ADD_IMAGE, dispatcher, filter } from "@/global";

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
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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

    return () => {
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


