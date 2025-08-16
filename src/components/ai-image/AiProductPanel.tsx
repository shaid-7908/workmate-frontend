import React, { useState } from "react";
import { IMAGES } from "@/data/images";
import { ADD_IMAGE, dispatcher } from "@/global";
import { nanoid } from "nanoid";
import { useGetUploadedImages, useInvalidateUploadedImages } from "@/apihooks/useGetUploadedImages";
import { RefreshCw, Upload } from "lucide-react";
import { GetImageProxy } from "@/api/imageapi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/ui/file-uploader";
import axiosInstance from "@/api/axios.instance";

interface AiProductPanelProps {
  className?: string;
}

const AiProductPanel: React.FC<AiProductPanelProps> = ({ className }) => {
  const { data: uploadedImages, isLoading, refetch } = useGetUploadedImages();
  const invalidateUploadedImages = useInvalidateUploadedImages();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
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

  const handleFileSelection = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setUploadFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    const formData = new FormData();
    
    formData.append('file', uploadFile);
    formData.append('image_type', 'gallery');
    formData.append('description', imageDescription.trim() || 'Product image');
    formData.append('tags', 'product');
    formData.append('is_public', 'false');
    formData.append('model', 'u2net');
    formData.append('edge_smoothing', 'true');

    try {
      // Use the background removal endpoint
      const response = await axiosInstance.post('/api/v1/uploads/upload-remove-bg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      if (response.data.success && response.data.upload) {
        const processedUrl = response.data.upload.fileUrl;
        setProcessedImageUrl(processedUrl);
        
        // Start transition effect
        setShowTransition(true);
        
        // Wait for transition to complete, then close modal
        setTimeout(() => {
          handleCloseModal();
          invalidateUploadedImages();
        }, 2000); // 2 seconds to show the transition
      }
      
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadFile(null);
    setImagePreview(null);
    setProcessedImageUrl(null);
    setImageDescription("");
    setUploadProgress(0);
    setShowTransition(false);
    setIsUploading(false);
  };

  return (
    <div className={className}>
      <div className="mt-3 space-y-3">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-700 bg-gray-950/40 p-3 text-sm text-gray-300 hover:bg-gray-900/60 transition-colors">
              <Upload className="h-4 w-4" />
              Upload Product Photo
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-100">Upload Product Image</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {!imagePreview ? (
                <FileUploader
                  value={uploadFile ? [uploadFile] : []}
                  onValueChange={handleFileSelection}
                  maxFileCount={1}
                  maxSize={5 * 1024 * 1024}
                  accept={{
                    "image/*": [".jpg", ".jpeg", ".png", ".webp"]
                  }}
                  multiple={false}
                  className="border-gray-700 bg-gray-800/40"
                />
              ) : (
                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="relative rounded-lg border border-gray-700 bg-gray-800/40 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-200">Selected Image:</h4>
                      <button
                        onClick={() => {
                          setUploadFile(null);
                          setImagePreview(null);
                          setProcessedImageUrl(null);
                          setImageDescription("");
                          setShowTransition(false);
                        }}
                        className="text-xs text-gray-400 hover:text-gray-200 underline"
                      >
                        Change Image
                      </button>
                    </div>
                    
                    <div className="w-full relative">
                      {/* Original Image */}
                      <img
                        src={imagePreview}
                        alt="Original Preview"
                        className={`w-full max-h-60 object-contain rounded-md border border-gray-600 bg-gray-900/40 transition-opacity duration-1000 ${
                          showTransition ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      
                      {/* Processed Image (Background Removed) */}
                      {processedImageUrl && (
                        <img
                          src={processedImageUrl}
                          alt="Background Removed"
                          className={`absolute inset-0 w-full max-h-60 object-contain rounded-md border border-gray-600 bg-gray-900/40 transition-opacity duration-1000 ${
                            showTransition ? 'opacity-100' : 'opacity-0'
                          }`}
                          crossOrigin="anonymous"
                        />
                      )}
                      
                      {/* Processing Overlay */}
                      {isUploading && (
                        <div className="absolute inset-0 bg-gray-900/80 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lime-400 text-sm font-medium mb-2">
                              Removing Background...
                            </div>
                            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Image Description (Optional)
                    </label>
                    <textarea
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      placeholder="Describe this product image..."
                      className="w-full h-20 px-3 py-2 text-sm bg-gray-800/60 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 resize-none focus:outline-none focus:border-lime-400 transition-colors"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-400 text-right">
                      {imageDescription.length}/500
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-lime-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-md hover:bg-gray-800/60 transition-colors"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || isUploading || showTransition}
                  className="px-4 py-2 text-sm bg-lime-400 text-gray-900 rounded-md hover:bg-lime-300 disabled:opacity-50 transition-colors"
                >
                  {showTransition 
                    ? 'Processing Complete!' 
                    : isUploading 
                    ? `Removing Background... ${uploadProgress}%` 
                    : 'Upload & Remove Background'
                  }
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
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


