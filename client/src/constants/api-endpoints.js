export const API_ENDPOINTS = {
    ORDERS: "/orders",

    ORDER_STATUS: (orderId) =>
        `/orders/${orderId}/status`,

    ARCHIVE_OLD_ORDERS: "/archive-old-orders",
};