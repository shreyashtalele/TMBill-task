import { HTTP_STATUS } from "../constants/http.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

import { archiveOldOrders } from "../services/archive.service.js";

import { sendSuccessResponse } from "../utils/apiResponse.js";

export const archiveOldOrdersController = async (
    request,
    response,
    next
) => {
    try {
        const result = await archiveOldOrders();

        return sendSuccessResponse({
            res: response,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.OLD_ORDERS_ARCHIVED,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};