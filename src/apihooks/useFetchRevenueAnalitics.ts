import { useQuery } from "@tanstack/react-query";
import { FetchTotalRevenueAnalytics } from "@/api/productapi";

export const useFetchRevenueAnalitics = ()=>{
    return useQuery({
        queryKey:['fetch-total-revenue-analytics'],
        queryFn:FetchTotalRevenueAnalytics
    })
}

    