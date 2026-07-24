import apiClient from "@/lib/api-client";

export async function getOrdersPerDay() {
    const response = await apiClient.get(
        "/analytics/orders-per-day"
    );

    return response.data;
}

export async function getRevenuePerStore() {
    const response = await apiClient.get(
        "/analytics/revenue-per-store"
    );

    return response.data;
}

export async function getTopSellingItems() {
    const response = await apiClient.get(
        "/analytics/top-selling-items"
    );

    return response.data;
}