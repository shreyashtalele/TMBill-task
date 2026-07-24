export const API_ROUTES = Object.freeze({
    HEALTH: "/api/health",

    ORDERS: "/api/orders",

    ARCHIVE_OLD_ORDERS: "/api/archive-old-orders",

    ANALYTICS: Object.freeze({
        BASE: "/api/analytics",
        ORDERS_PER_DAY: "/orders-per-day",
        REVENUE_PER_STORE: "/revenue-per-store",
        TOP_SELLING_ITEMS: "/top-selling-items",
    }),
});