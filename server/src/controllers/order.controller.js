import { HTTP_STATUS } from "../constants/http.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

import {
    changeOrderStatus,
    createNewOrder,
    getOrders,
} from "../services/order.service.js";

import { sendSuccessResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(
    async (req, res) => {
        const order = await createNewOrder(
            req.validatedData.body
        );

        return sendSuccessResponse({
            res,
            statusCode: HTTP_STATUS.CREATED,
            message:
                RESPONSE_MESSAGES.ORDER_CREATED,
            data: order,
        });
    }
);

export const getAllOrders = asyncHandler(
    async (req, res) => {
        const orders = await getOrders(
            req.validatedData.query
        );

        return sendSuccessResponse({
            res,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.ORDERS_FETCHED,
            data: orders,
        });
    }
);

export const updateOrderStatus = asyncHandler(
    async (req, res) => {
        const order = await changeOrderStatus({
            ...req.validatedData.params,
            ...req.validatedData.body,
        });

        return sendSuccessResponse({
            res,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.ORDER_STATUS_UPDATED,
            data: order,
        });
    }
);