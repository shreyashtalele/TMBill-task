import { z } from "zod";

import { VALIDATION_MESSAGES } from "@/constants/validation-messages";

const positiveInteger = (requiredMessage, invalidMessage) =>
    z.coerce
        .number({
            error: requiredMessage,
        })
        .int(invalidMessage)
        .min(1, invalidMessage);

const orderItemSchema = z.object({
    item_id: positiveInteger(
        VALIDATION_MESSAGES.ITEM_ID_REQUIRED,
        VALIDATION_MESSAGES.ITEM_ID_INVALID
    ),

    qty: positiveInteger(
        VALIDATION_MESSAGES.QUANTITY_REQUIRED,
        VALIDATION_MESSAGES.QUANTITY_INVALID
    ),
});

export const orderSchema = z.object({
    store_id: positiveInteger(
        VALIDATION_MESSAGES.STORE_ID_REQUIRED,
        VALIDATION_MESSAGES.STORE_ID_INVALID
    ),

    items: z
        .array(orderItemSchema)
        .min(1, VALIDATION_MESSAGES.ITEMS_REQUIRED),

    total_amount: z.coerce
        .number({
            error: VALIDATION_MESSAGES.TOTAL_AMOUNT_REQUIRED,
        })
        .positive(VALIDATION_MESSAGES.TOTAL_AMOUNT_INVALID),
});