import { API_ENDPOINTS } from "@/constants/api-endpoints";
import apiClient from "@/lib/api-client";

export async function createOrder(orderData) {
    const response = await apiClient.post(
        API_ENDPOINTS.ORDERS,
        orderData
    );

    return response.data;
}

export async function getOrders({
    storeId,
    page = 1,
    limit = 10,
} = {}) {
    const response = await apiClient.get(
        API_ENDPOINTS.ORDERS,
        {
            params: {
                store_id: storeId,
                page,
                limit,
            },
        }
    );

    return response.data;
}

export async function updateOrderStatus({
    orderId,
    status,
}) {
    const response = await apiClient.patch(
        API_ENDPOINTS.ORDER_STATUS(orderId),
        {
            status,
        }
    );

    return response.data;
}