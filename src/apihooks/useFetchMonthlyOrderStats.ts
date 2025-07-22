import { useQuery } from "@tanstack/react-query";
import { FetchMonthlyRevenueAnalytics } from "@/api/productapi";

export const useFetchMonthlyOrderStats = ()=>{
    return useQuery({
        queryKey:['fetch-monthly-order-stats'],
        queryFn:FetchMonthlyRevenueAnalytics
    })
}

