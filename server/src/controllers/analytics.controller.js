import { HTTP_STATUS } from "../constants/http.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

import {
    fetchOrdersPerDay,
    fetchRevenuePerStore,
    fetchTopSellingItems,
} from "../services/analytics.service.js";

import { sendSuccessResponse } from "../utils/apiResponse.js";

export const getOrdersPerDayController = async (
    request,
    response,
    next
) => {
    try {
        const data = await fetchOrdersPerDay();

        return sendSuccessResponse({
            res: response,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.ORDERS_PER_DAY_FETCHED,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getRevenuePerStoreController = async (
    request,
    response,
    next
) => {
    try {
        const data = await fetchRevenuePerStore();

        return sendSuccessResponse({
            res: response,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.REVENUE_PER_STORE_FETCHED,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getTopSellingItemsController = async (
    request,
    response,
    next
) => {
    try {
        const data = await fetchTopSellingItems();

        return sendSuccessResponse({
            res: response,
            statusCode: HTTP_STATUS.OK,
            message:
                RESPONSE_MESSAGES.TOP_SELLING_ITEMS_FETCHED,
            data,
        });
    } catch (error) {
        next(error);
    }
};