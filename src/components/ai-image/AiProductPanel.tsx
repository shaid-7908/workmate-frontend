import React from "react";
import { IMAGES } from "@/data/images";
import { ADD_IMAGE, dispatcher } from "@/global";
import { nanoid } from "nanoid";

interface AiProductPanelProps {
  className?: string;
}

const AiProductPanel: React.FC<AiProductPanelProps> = ({ className }) => {
  const handleAddByUrl = (src: string) => {
    dispatcher?.dispatch(ADD_IMAGE, {
      payload: {
        id: nanoid(),
        details: {
          src,
        },
      },
      options: {},
    });
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = String(ev.target?.result || "");
      if (url) handleAddByUrl(url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <div className="mt-3">
        <label className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-700 bg-gray-950/40 p-3 text-sm text-gray-300 hover:bg-gray-900/60">
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
          Upload Product Photo
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {IMAGES.slice(0, 9).map((img) => (
          <div
            key={img.id}
            className="group relative h-24 overflow-hidden rounded-md bg-gray-800/40 ring-1 ring-gray-800"
            onClick={() => handleAddByUrl(img.src)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", img.src);
            }}
          >
            <img src={img.src} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiProductPanel;


