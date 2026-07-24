"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { socket } from "@/lib/socket";

export function useOrderSocket(storeId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!storeId) {
            return;
        }

        function refreshOrderData() {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORDERS,
            });

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORDERS_PER_DAY,
            });

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.REVENUE_PER_STORE,
            });

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TOP_SELLING_ITEMS,
            });
        }

        function handleConnect() {
            console.log("Socket connected:", socket.id);

            socket.emit("join_store", storeId);
        }

        function handleStoreJoined(data) {
            console.log("Joined room:", data);
        }

        function handleNewOrder(order) {
            console.log("New Order:", order);

            refreshOrderData();
        }

        function handleOrderStatusUpdated(order) {
            console.log("Order Status Updated:", order);

            refreshOrderData();
        }

        socket.on("connect", handleConnect);
        socket.on("store_joined", handleStoreJoined);
        socket.on("new_order", handleNewOrder);
        socket.on(
            "order_status_updated",
            handleOrderStatusUpdated
        );

        if (!socket.connected) {
            socket.connect();
        } else {
            socket.emit("join_store", storeId);
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("store_joined", handleStoreJoined);
            socket.off("new_order", handleNewOrder);
            socket.off(
                "order_status_updated",
                handleOrderStatusUpdated
            );
        };
    }, [queryClient, storeId]);
}