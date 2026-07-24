"use client";

import { useQueries } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import {
    getOrdersPerDay,
    getRevenuePerStore,
    getTopSellingItems,
} from "@/services/analytics-service";

export function useAnalytics() {
    const results = useQueries({
        queries: [
            {
                queryKey: QUERY_KEYS.ORDERS_PER_DAY,
                queryFn: getOrdersPerDay,
            },
            {
                queryKey: QUERY_KEYS.REVENUE_PER_STORE,
                queryFn: getRevenuePerStore,
            },
            {
                queryKey: QUERY_KEYS.TOP_SELLING_ITEMS,
                queryFn: getTopSellingItems,
            },
        ],
    });

    const ordersPerDay = results[0];
    const revenuePerStore = results[1];
    const topSellingItems = results[2];

    const isLoading = results.some((query) => query.isLoading);
    const isError = results.some((query) => query.isError);
    const isFetching = results.some((query) => query.isFetching);

    const failedQuery = results.find((query) => query.isError);

    const refetchAll = async () => {
        await Promise.all(results.map((query) => query.refetch()));
    };

    return {
        ordersPerDay,
        revenuePerStore,
        topSellingItems,
        isLoading,
        isError,
        isFetching,
        error: failedQuery?.error ?? null,
        refetchAll,
    };
}