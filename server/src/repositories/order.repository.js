import { databasePool } from "../config/database.config.js";

export const createOrder = async (connection, orderData) => {
    const query = `
        INSERT INTO orders (
            store_id,
            total_amount,
            status
        )
        VALUES (?, ?, ?)
    `;

    const values = [
        orderData.store_id,
        orderData.total_amount,
        orderData.status,
    ];

    const [result] = await connection.execute(query, values);

    return result.insertId;
};

export const createOrderItems = async (
    connection,
    orderId,
    items
) => {
    const query = `
        INSERT INTO order_items (
            order_id,
            item_id,
            qty
        )
        VALUES (?, ?, ?)
    `;

    for (const item of items) {
        await connection.execute(query, [
            orderId,
            item.item_id,
            item.qty,
        ]);
    }
};

export const getConnection = async () => {
    return databasePool.getConnection();
};

export const findOrderByIdWithConnection = async (
    connection,
    orderId
) => {
    const query = `
        SELECT
            id,
            store_id,
            total_amount,
            status,
            created_at,
            updated_at
        FROM orders
        WHERE id = ?
    `;

    const [rows] = await connection.execute(query, [orderId]);

    return rows[0] || null;
};

export const getOrdersByStore = async (
    storeId,
    page,
    limit
) => {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            id,
            store_id,
            total_amount,
            status,
            created_at,
            updated_at
        FROM orders
        WHERE store_id = ?
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
    `;

    const [orders] = await databasePool.execute(query, [storeId]);

    return orders;
};

export const getOrdersCount = async (storeId) => {
    const query = `
        SELECT COUNT(*) AS total
        FROM orders
        WHERE store_id = ?
    `;

    const [rows] = await databasePool.execute(query, [storeId]);

    return rows[0].total;
};

export const getOrderItems = async (orderId) => {
    const query = `
        SELECT
            item_id,
            qty
        FROM order_items
        WHERE order_id = ?
    `;

    const [items] = await databasePool.execute(query, [orderId]);

    return items;
};

export const findOrderById = async (orderId) => {
    const query = `
        SELECT
            id,
            store_id,
            total_amount,
            status,
            created_at,
            updated_at
        FROM orders
        WHERE id = ?
    `;

    const [rows] = await databasePool.execute(query, [orderId]);

    return rows[0] || null;
};

export const updateOrderStatus = async (
    orderId,
    status
) => {
    const query = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    const [result] = await databasePool.execute(query, [
        status,
        orderId,
    ]);

    return result.affectedRows;
};


export const getOrderItemsByOrderIds = async (orderIds) => {
    if (orderIds.length === 0) {
        return [];
    }

    const placeholders = orderIds
        .map(() => "?")
        .join(", ");

    const query = `
        SELECT
            order_id,
            item_id,
            qty
        FROM order_items
        WHERE order_id IN (${placeholders})
    `;

    const [items] = await databasePool.execute(
        query,
        orderIds
    );

    return items;
};