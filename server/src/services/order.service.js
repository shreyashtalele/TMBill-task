import { ORDER_STATUS } from "../constants/order.constants.js";
import {
    getOrdersByStore,
    getOrdersCount,
    getOrderItems,
    findOrderById,
    updateOrderStatus,
} from "../repositories/order.repository.js";
import { AppError } from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";

export const createNewOrder = async (orderData) => {
    const connection = await getConnection();

    try {
        await connection.beginTransaction();

        const orderId = await createOrder(connection, {
            ...orderData,
            status: ORDER_STATUS.PLACED,
        });

        await createOrderItems(
            connection,
            orderId,
            orderData.items
        );

        await connection.commit();

        return {
            id: orderId,
            store_id: orderData.store_id,
            items: orderData.items,
            total_amount: orderData.total_amount,
            status: ORDER_STATUS.PLACED,
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const getOrders = async ({
    store_id,
    page,
    limit,
}) => {
    const orders = await getOrdersByStore(
        store_id,
        page,
        limit
    );

    const total = await getOrdersCount(store_id);

    for (const order of orders) {
        order.items = await getOrderItems(order.id);
    }

    return {
        orders,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const changeOrderStatus = async ({
    id,
    status,
}) => {
    const order = await findOrderById(id);

    if (!order) {
        throw new AppError(
            "Order not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    await updateOrderStatus(id, status);

    return {
        ...order,
        status,
    };
};