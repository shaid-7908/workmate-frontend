import React, { useState } from "react";
import { IMAGES } from "@/data/images";
import { ADD_IMAGE, dispatcher } from "@/global";
import { nanoid } from "nanoid";
import { useGetUploadedImages, useInvalidateUploadedImages } from "@/apihooks/useGetUploadedImages";
import { RefreshCw } from "lucide-react";
import { GetImageProxy } from "@/api/imageapi";

interface AiProductPanelProps {
  className?: string;
}

const AiProductPanel: React.FC<AiProductPanelProps> = ({ className }) => {
  const { data: uploadedImages, isLoading, refetch } = useGetUploadedImages();
  const invalidateUploadedImages = useInvalidateUploadedImages();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  console.log(uploadedImages);
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
      if (url) {
        handleAddByUrl(url);
        // Invalidate cache after upload to show new image
        setTimeout(() => invalidateUploadedImages(), 1000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRefresh = () => {
    invalidateUploadedImages();
  };

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const handleImageLoad = (imageId: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  return (
    <div className={className}>
      <div className="mt-3 space-y-3">
        <label className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-700 bg-gray-950/40 p-3 text-sm text-gray-300 hover:bg-gray-900/60">
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
          Upload Product Photo
        </label>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800/40 p-2.5 text-sm text-gray-300 transition-colors hover:bg-gray-700/60 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh Images'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {uploadedImages?.data?.uploads.map((img: any) => (
          <div
            key={img.id}
            className="group relative h-24 overflow-hidden rounded-md bg-gray-800/40 ring-1 ring-gray-800"
            onClick={() => handleAddByUrl(img.fileUrl as string)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", img.fileUrl);
            }}
                      >
              {imageErrors.has(img.id) ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-700/40 text-xs text-gray-400">
                  CORS Error
                </div>
              ) : (
                <>
                  <img 
                    src={img.fileUrl} 
                    className="h-full w-full object-cover" 
                    onLoad={() => handleImageLoad(img.id)}
                    onError={() => handleImageError(img.id)}
                    crossOrigin="anonymous"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiProductPanel;


