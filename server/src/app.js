import cors from "cors";
import express from "express";

import { environment } from "./config/env.config.js";

import { HTTP_STATUS } from "./constants/http.constants.js";
import { RESPONSE_MESSAGES } from "./constants/message.constants.js";
import { API_ROUTES } from "./constants/route.constants.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

import orderRouter from "./routes/index.routes.js";

import { sendSuccessResponse } from "./utils/apiResponse.js";

const app = express();

const corsOptions = Object.freeze({
    origin: environment.clientUrl,
    credentials: true,
});

app.use(cors(corsOptions));
app.use(express.json());

app.get(API_ROUTES.HEALTH, (req, res) => {
    return sendSuccessResponse({
        res,
        statusCode: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.API_RUNNING,
    });
});

app.use(orderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;