import "dotenv/config";

import { APP_CONSTANTS } from "../constants/app.constants.js";
import { DATABASE_CONSTANTS } from "../constants/database.constants.js";

const getRequiredEnvironmentVariable = (key) => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const environment = Object.freeze({
    nodeEnv:
        process.env.NODE_ENV || APP_CONSTANTS.NODE_ENV.DEVELOPMENT,

    port: Number(process.env.PORT) || APP_CONSTANTS.DEFAULT_PORT,

    clientUrl: getRequiredEnvironmentVariable("CLIENT_URL"),

    database: Object.freeze({
        host: getRequiredEnvironmentVariable("DB_HOST"),
        port:
            Number(process.env.DB_PORT) ||
            DATABASE_CONSTANTS.DEFAULT_PORT,
        name: getRequiredEnvironmentVariable("DB_NAME"),
        user: getRequiredEnvironmentVariable("DB_USER"),
        password: getRequiredEnvironmentVariable("DB_PASSWORD"),
    }),
});