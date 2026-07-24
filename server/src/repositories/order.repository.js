import { databasePool } from "../config/database.config.js";

export const getConnection = async () => {
    return databasePool.getConnection();
};

export const createOrder = async (
    connection,
    orderData
) => {
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

    const [result] = await connection.execute(
        query,
        values
    );

    return result.insertId;
};

export const createOrderItems = async (
    connection,
    orderId,
    items
) => {
    if (items.length === 0) {
        return;
    }

    const placeholders = items
        .map(() => "(?, ?, ?)")
        .join(", ");

    const values = items.flatMap((item) => [
        orderId,
        item.item_id,
        item.qty,
    ]);

    const query = `
        INSERT INTO order_items (
            order_id,
            item_id,
            qty
        )
        VALUES ${placeholders}
    `;

    await connection.execute(query, values);
};

export const findOrderByIdWithConnection =
    async (connection, orderId) => {
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
            LIMIT 1
        `;

        const [rows] = await connection.execute(
            query,
            [orderId]
        );

        return rows[0] ?? null;
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
        LIMIT 1
    `;

    const [rows] = await databasePool.execute(
        query,
        [orderId]
    );

    return rows[0] ?? null;
};

export const getOrdersByStore = async (
    storeId,
    page,
    limit
) => {
    const numericStoreId = Number(storeId);
    const numericPage = Number(page);
    const numericLimit = Number(limit);
    const offset =
        (numericPage - 1) * numericLimit;

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
        ORDER BY created_at DESC, id DESC
        LIMIT ?
        OFFSET ?
    `;

    const [orders] = await databasePool.query(
        query,
        [
            numericStoreId,
            numericLimit,
            offset,
        ]
    );

    return orders;
};
export const getOrdersCount = async (storeId) => {
    const query = `
        SELECT COUNT(*) AS total
        FROM orders
        WHERE store_id = ?
    `;

    const [rows] = await databasePool.execute(
        query,
        [storeId]
    );

    return Number(rows[0].total);
};

export const getOrderItems = async (orderId) => {
    const query = `
        SELECT
            item_id,
            qty
        FROM order_items
        WHERE order_id = ?
        ORDER BY id ASC
    `;

    const [items] = await databasePool.execute(
        query,
        [orderId]
    );

    return items;
};

export const getOrderItemsByOrderIds = async (
    orderIds
) => {
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
        ORDER BY order_id ASC, id ASC
    `;

    const [items] = await databasePool.execute(
        query,
        orderIds
    );

    return items;
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

    const [result] = await databasePool.execute(
        query,
        [status, orderId]
    );

    return result.affectedRows;
};