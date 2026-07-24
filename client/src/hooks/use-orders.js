"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getOrders } from "@/services/order-service";

export function useOrders({
    storeId,
    page = 1,
    limit = 10,
} = {}) {
    return useQuery({
        queryKey: [
            ...QUERY_KEYS.ORDERS,
            storeId,
            page,
            limit,
        ],

        queryFn: () =>
            getOrders({
                storeId,
                page,
                limit,
            }),

        enabled: Boolean(storeId),
    });
}