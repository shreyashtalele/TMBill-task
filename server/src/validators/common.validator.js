import { z } from "zod";

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
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),
});