import { useQuery } from "@tanstack/react-query";
import { FetchProduct } from "@/api/productapi";

export const useFetchProduct = ()=>{
    return useQuery({
        queryKey:['fetch-shopify-product'],
        queryFn:FetchProduct
    })
}