import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUploadedImages } from "@/api/imageapi";

export const useGetUploadedImages = (enableCaching = true) => {
    return useQuery({
        queryKey: ['uploaded-images'],
        queryFn: GetUploadedImages,
        staleTime: enableCaching ? 5 * 60 * 1000 : 0, // 5 minutes or 0 for no caching
        gcTime: enableCaching ? 10 * 60 * 1000 : 0, // 10 minutes or 0 for immediate cleanup
    })
}

// Helper hook to invalidate uploaded images cache
export const useInvalidateUploadedImages = () => {
    const queryClient = useQueryClient();
    
    return () => {
        queryClient.invalidateQueries({
            queryKey: ['uploaded-images']
        });
    };
};

