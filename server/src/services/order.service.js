import { getSocketServer } from "../config/socket.config.js";

import { HTTP_STATUS } from "../constants/http.constants.js";
import { ORDER_STATUS } from "../constants/order.constants.js";
import {
    SOCKET_EVENTS,
    SOCKET_ROOMS,
} from "../constants/socket.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

import { mapOrderResponse } from "../mappers/order.mapper.js";

import {
    createOrder,
    createOrderItems,
    findOrderById,
    findOrderByIdWithConnection,
    getConnection,
    getOrderItemsByOrderIds,
    getOrdersByStore,
    getOrdersCount,
    updateOrderStatus,
} from "../repositories/order.repository.js";

import { AppError } from "../utils/appError.js";

const emitOrderEvent = ({
    event,
    storeId,
    data,
}) => {
    try {
        const io = getSocketServer();
        const roomName = SOCKET_ROOMS.STORE(storeId);

        io.to(roomName).emit(event, {
            success: true,
            data,
        });
    } catch (error) {
        /*
         * The database operation has already succeeded.
         * A Socket.IO failure must not fail the HTTP request.
         */
        console.error(
            RESPONSE_MESSAGES.SOCKET_EMIT_FAILED(event),
            error
        );
    }
};

const groupOrderItemsByOrderId = (orderItems) => {
    const itemsByOrderId = {};

    for (const item of orderItems) {
        const orderId = item.order_id;

        if (!itemsByOrderId[orderId]) {
            itemsByOrderId[orderId] = [];
        }

        itemsByOrderId[orderId].push({
            item_id: item.item_id,
            qty: item.qty,
        });
    }

    return itemsByOrderId;
};

export const createNewOrder = async (orderData) => {
    const connection = await getConnection();

    let createdOrder;

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

        const order =
            await findOrderByIdWithConnection(
                connection,
                orderId
            );

        createdOrder = {
            ...mapOrderResponse(order),
            items: orderData.items,
        };

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }

    emitOrderEvent({
        event: SOCKET_EVENTS.NEW_ORDER,
        storeId: createdOrder.store_id,
        data: createdOrder,
    });

    return createdOrder;
};

export const getOrders = async ({
    store_id,
    page,
    limit,
}) => {
    const [orders, total] = await Promise.all([
        getOrdersByStore(store_id, page, limit),
        getOrdersCount(store_id),
    ]);

    const orderIds = orders.map((order) => order.id);

    const orderItems =
        await getOrderItemsByOrderIds(orderIds);

    const itemsByOrderId =
        groupOrderItemsByOrderId(orderItems);

    const ordersWithItems = orders.map((order) => ({
        ...mapOrderResponse(order),
        items: itemsByOrderId[order.id] ?? [],
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
    const existingOrder = await findOrderById(id);

    if (!existingOrder) {
        throw new AppError(
            RESPONSE_MESSAGES.ORDER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
        );
    }

    await updateOrderStatus(id, status);

    const updatedOrder = await findOrderById(id);
    const mappedOrder =
        mapOrderResponse(updatedOrder);

    emitOrderEvent({
        event: SOCKET_EVENTS.ORDER_STATUS_UPDATED,
        storeId: mappedOrder.store_id,
        data: mappedOrder,
    });

    return mappedOrder;
};