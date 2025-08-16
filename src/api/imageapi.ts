import axiosInstance from "./axios.instance";

export async function GetUploadedImages():Promise<any>{
    const response = await axiosInstance.get('/api/v1/uploads/uploads')
    return response
}

export async function GetImageProxy(imageUrl: string): Promise<Blob> {
    const response = await axiosInstance.post('/api/v1/uploads/proxy-image', 
        { imageUrl }, 
        { responseType: 'blob' }
    );
    return response.data;
}

