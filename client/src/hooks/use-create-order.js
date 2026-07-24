"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { createOrder } from "@/services/order-service";

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORDERS,
            });
        },
    });
}