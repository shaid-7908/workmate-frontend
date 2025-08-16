import axiosInstance from "./axios.instance";

export async function FetchProduct ():Promise<any>{
    const response = await axiosInstance.get('/shopify/products')
    return response

}

export async function FetchTotalRevenueAnalytics():Promise<any>{
    const response = await axiosInstance.get('/api/orders/analytics/total-orders')
    return response
}

export async function FetchMonthlyRevenueAnalytics():Promise<any>{
    const response = await axiosInstance.get('/api/orders/analytics/monthly-order-data?year=2025')
    return response.data
}

export async function FetchTotalOrders():Promise<any>{
    const response = await axiosInstance.get('/shopify/total_orders')
    return response
}

export async function GenerateAiImage(payload: { image_base64: string; prompt?: string }): Promise<any> {
    const response = await axiosInstance.post('/api/ai/generate', payload)
    return response.data
}