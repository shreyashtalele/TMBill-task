import express from "express";
import cors from "cors";

import { environment } from "./config/env.config.js";
import { HTTP_STATUS } from "./constants/http.constants.js";
import { RESPONSE_MESSAGES } from "./constants/message.constants.js";
import { API_ROUTES } from "./constants/route.constants.js";
import { sendSuccessResponse } from "./utils/apiResponse.js";

import orderRouter from "./routes/index.routes.js";

import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: environment.clientUrl,
        credentials: true,
    })
);

app.use(express.json());

// Health Check
app.get(API_ROUTES.HEALTH, (req, res) => {
    return sendSuccessResponse({
        res,
        statusCode: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.API_RUNNING,
    });
});

// API Routes
app.use(orderRouter);

// 404 Handler
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorMiddleware);

export default app;