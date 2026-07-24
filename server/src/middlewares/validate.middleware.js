import { ZodError } from "zod";

import { AppError } from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse({
                body: req.body ?? {},
                params: req.params,
                query: req.query,
            });

            req.validatedData = validatedData;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new AppError(
                        error.issues[0].message,
                        HTTP_STATUS.BAD_REQUEST
                    )
                );
            }

            next(error);
        }
    };
};