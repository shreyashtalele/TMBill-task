import {
    getOrdersPerDay,
    getRevenuePerStore,
    getTopSellingItems,
} from "../repositories/analytics.repository.js";

export const fetchOrdersPerDay = async () => {
    const rows = await getOrdersPerDay();

    return rows.map((row) => ({
        order_date: row.order_date,
        total_orders: Number(row.total_orders),
    }));
};

export const fetchRevenuePerStore = async () => {
    const rows = await getRevenuePerStore();

    return rows.map((row) => ({
        store_id: row.store_id,
        total_revenue: Number(row.total_revenue),
    }));
};

export const fetchTopSellingItems = async () => {
    const rows = await getTopSellingItems();

    return rows.map((row) => ({
        item_id: row.item_id,
        total_quantity: Number(row.total_quantity),
    }));
};