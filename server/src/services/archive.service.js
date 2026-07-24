import { getConnection } from "../repositories/order.repository.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

import {
    archiveOrders,
    archiveOrderItems,
    deleteOrderItems,
    deleteOrders,
    findArchivableOrderIds,
} from "../repositories/archive.repository.js";

export const archiveOldOrders = async () => {
    const connection = await getConnection();

    try {
        await connection.beginTransaction();

        const orderIds =
            await findArchivableOrderIds(connection);

        if (orderIds.length === 0) {
            await connection.commit();

            return {
                archivedOrdersCount: 0,
                archivedOrderItemsCount: 0,
            };
        }

        const archivedOrdersCount =
            await archiveOrders(
                connection,
                orderIds
            );

        const archivedOrderItemsCount =
            await archiveOrderItems(
                connection,
                orderIds
            );

        await deleteOrderItems(
            connection,
            orderIds
        );

        const deletedOrdersCount =
            await deleteOrders(
                connection,
                orderIds
            );

        if (
            archivedOrdersCount !==
            deletedOrdersCount
        ) {
            throw new Error(
                RESPONSE_MESSAGES.ARCHIVE_COUNT_MISMATCH
            );
        }

        await connection.commit();

        return {
            archivedOrdersCount,
            archivedOrderItemsCount,
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};