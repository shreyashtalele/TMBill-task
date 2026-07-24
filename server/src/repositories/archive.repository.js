export const findArchivableOrderIds = async (
    connection
) => {
    const query = `
        SELECT id
        FROM orders
        WHERE created_at < DATE_SUB(
            NOW(),
            INTERVAL 30 DAY
        )
        ORDER BY id ASC
        FOR UPDATE
    `;

    const [rows] = await connection.execute(query);

    return rows.map((row) => row.id);
};

export const archiveOrders = async (
    connection,
    orderIds
) => {
    if (orderIds.length === 0) {
        return 0;
    }

    const placeholders = orderIds
        .map(() => "?")
        .join(", ");

    const query = `
        INSERT INTO orders_archive (
            id,
            store_id,
            total_amount,
            status,
            created_at,
            updated_at
        )
        SELECT
            id,
            store_id,
            total_amount,
            status,
            created_at,
            updated_at
        FROM orders
        WHERE id IN (${placeholders})
    `;

    const [result] = await connection.execute(
        query,
        orderIds
    );

    return result.affectedRows;
};

export const archiveOrderItems = async (
    connection,
    orderIds
) => {
    if (orderIds.length === 0) {
        return 0;
    }

    const placeholders = orderIds
        .map(() => "?")
        .join(", ");

    const query = `
        INSERT INTO order_items_archive (
            id,
            order_id,
            item_id,
            qty,
            created_at
        )
        SELECT
            id,
            order_id,
            item_id,
            qty,
            created_at
        FROM order_items
        WHERE order_id IN (${placeholders})
    `;

    const [result] = await connection.execute(
        query,
        orderIds
    );

    return result.affectedRows;
};

export const deleteOrderItems = async (
    connection,
    orderIds
) => {
    if (orderIds.length === 0) {
        return 0;
    }

    const placeholders = orderIds
        .map(() => "?")
        .join(", ");

    const query = `
        DELETE FROM order_items
        WHERE order_id IN (${placeholders})
    `;

    const [result] = await connection.execute(
        query,
        orderIds
    );

    return result.affectedRows;
};

export const deleteOrders = async (
    connection,
    orderIds
) => {
    if (orderIds.length === 0) {
        return 0;
    }

    const placeholders = orderIds
        .map(() => "?")
        .join(", ");

    const query = `
        DELETE FROM orders
        WHERE id IN (${placeholders})
    `;

    const [result] = await connection.execute(
        query,
        orderIds
    );

    return result.affectedRows;
};