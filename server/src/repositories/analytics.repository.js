import { databasePool } from "../config/database.config.js";

export const getOrdersPerDay = async () => {
    const query = `
        SELECT
            DATE(created_at) AS order_date,
            COUNT(*) AS total_orders
        FROM (
            SELECT created_at
            FROM orders

            UNION ALL

            SELECT created_at
            FROM orders_archive
        ) AS all_orders
        GROUP BY DATE(created_at)
        ORDER BY order_date ASC
    `;

    const [rows] = await databasePool.execute(query);

    return rows;
};

export const getRevenuePerStore = async () => {
    const query = `
        SELECT
            store_id,
            SUM(total_amount) AS total_revenue
        FROM (
            SELECT store_id, total_amount
            FROM orders

            UNION ALL

            SELECT store_id, total_amount
            FROM orders_archive
        ) AS all_orders
        GROUP BY store_id
        ORDER BY total_revenue DESC
    `;

    const [rows] = await databasePool.execute(query);

    return rows;
};

export const getTopSellingItems = async () => {
    const query = `
        SELECT
            item_id,
            SUM(qty) AS total_quantity
        FROM (
            SELECT item_id, qty
            FROM order_items

            UNION ALL

            SELECT item_id, qty
            FROM order_items_archive
        ) AS all_order_items
        GROUP BY item_id
        ORDER BY total_quantity DESC, item_id ASC
        LIMIT 5
    `;

    const [rows] = await databasePool.execute(query);

    return rows;
};