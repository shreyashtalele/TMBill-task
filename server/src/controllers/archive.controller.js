import { HTTP_STATUS } from "../constants/http.constants.js";
import { archiveOldOrders } from "../services/archive.service.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

export const archiveOldOrdersController = async (
    request,
    response,
    next
) => {
    try {
        const result = await archiveOldOrders();

        return response.status(HTTP_STATUS.OK).json({
            success: true,
            message: RESPONSE_MESSAGES.OLD_ORDERS_ARCHIVED,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};