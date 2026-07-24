import { Router } from "express";

import {
    createOrder,
    getAllOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
    createOrderSchema,
    getOrdersSchema,
    updateOrderStatusSchema,
} from "../validators/order.validator.js";

import { API_ROUTES } from "../constants/route.constants.js";

const orderRouter = Router();

orderRouter.post(
    API_ROUTES.ORDERS,
    validate(createOrderSchema),
    createOrder
);

orderRouter.get(
    API_ROUTES.ORDERS,
    validate(getOrdersSchema, "query"),
    getAllOrders
);
orderRouter.patch(
    `${API_ROUTES.ORDERS}/:id/status`,
    validate(updateOrderStatusSchema),
    updateOrderStatus
);
export default orderRouter;