import { ORDER_STATUS } from "../constants/order.constants.js";

import {
    getConnection,
    createOrder,
    createOrderItems,
    findOrderByIdWithConnection,
    getOrdersByStore,
    getOrdersCount,
    getOrderItemsByOrderIds,
    findOrderById,
    updateOrderStatus,
} from "../repositories/order.repository.js";

import { AppError } from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { mapOrderResponse } from "../mappers/order.mapper.js";

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

        const createdOrder =
            await findOrderByIdWithConnection(
                connection,
                orderId
            );

        await connection.commit();

        return {
            ...mapOrderResponse(createdOrder),
            items: orderData.items,
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

    const orderIds = orders.map((order) => order.id);

    const orderItems =
        await getOrderItemsByOrderIds(orderIds);

    const itemsByOrderId = {};

    for (const item of orderItems) {
        if (!itemsByOrderId[item.order_id]) {
            itemsByOrderId[item.order_id] = [];
        }

        itemsByOrderId[item.order_id].push({
            item_id: item.item_id,
            qty: item.qty,
        });
    }

    const ordersWithItems = orders.map((order) => ({
        ...mapOrderResponse(order),
        items: itemsByOrderId[order.id] || [],
    }));

    return {
        orders: ordersWithItems,
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

    const updatedOrder = await findOrderById(id);

    return mapOrderResponse(updatedOrder);
};