import { HTTP_STATUS } from "../constants/http.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";
import { AppError } from "../utils/appError.js";

export const notFoundMiddleware = (req, res, next) => {
    next(
        new AppError(
            `${RESPONSE_MESSAGES.ROUTE_NOT_FOUND}: ${req.method} ${req.originalUrl}`,
            HTTP_STATUS.NOT_FOUND
        )
    );
};