import { APP_CONSTANTS } from "../constants/app.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";
import { environment } from "../config/env.config.js";

export const errorMiddleware = (error, req, res, next) => {
    const statusCode =
        error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const isProduction =
        environment.nodeEnv === APP_CONSTANTS.NODE_ENV.PRODUCTION;

    // Log full error for debugging
    console.error(error.stack);

    res.status(statusCode).json({
        success: false,
        message:
            isProduction && !error.isOperational
                ? RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
                : error.message,
    });
};