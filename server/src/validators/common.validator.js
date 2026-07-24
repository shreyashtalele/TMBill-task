import { z } from "zod";

const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
});

export const idSchema = z.coerce
    .number({
        error: "Id must be a number",
    })
    .int("Id must be an integer")
    .positive("Id must be greater than 0");

export const positiveNumberSchema = z
    .number({
        error: "Value must be a number",
    })
    .positive("Value must be greater than 0");

export const paginationSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(PAGINATION.DEFAULT_PAGE),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(PAGINATION.MAX_LIMIT)
        .default(PAGINATION.DEFAULT_LIMIT),
});