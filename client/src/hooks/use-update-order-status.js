"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { updateOrderStatus } from "@/services/order-service";

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORDERS,
            });
        },
    });
}