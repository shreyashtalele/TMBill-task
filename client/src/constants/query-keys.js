export const QUERY_KEYS = {
    ORDERS: ["orders"],

    ORDERS_BY_STORE: (storeId) => [
        "orders",
        "store",
        storeId,
    ],

    ORDERS_PER_DAY: ["orders-per-day"],

    REVENUE_PER_STORE: ["revenue-per-store"],

    TOP_SELLING_ITEMS: ["top-selling-items"],
};