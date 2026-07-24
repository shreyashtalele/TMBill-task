import { z } from "zod";

import { ORDER_STATUS } from "../constants/order.constants.js";

import {
    idSchema,
    paginationSchema,
    positiveNumberSchema,
} from "./common.validator.js";

const orderItemSchema = z.object({
    item_id: idSchema,
    qty: positiveNumberSchema,
});

const orderStatusSchema = z.enum(
    Object.values(ORDER_STATUS)
);

export const createOrderSchema = z.object({
    body: z.object({
        store_id: idSchema,

        items: z
            .array(orderItemSchema)
            .min(
                1,
                "At least one order item is required"
            ),

        total_amount: positiveNumberSchema,
    }),

    params: z.object({}),

    query: z.object({}),
});

export const getOrdersSchema = z.object({
    body: z.object({}),

    params: z.object({}),

    query: z.object({
        store_id: idSchema,

        page: paginationSchema.shape.page,

        limit: paginationSchema.shape.limit,
    }),
});

export const updateOrderStatusSchema = z.object({
    body: z.object({
        status: orderStatusSchema,
    }),

    params: z.object({
        id: idSchema,
    }),

    query: z.object({}),
});