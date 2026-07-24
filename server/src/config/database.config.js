import mysql from "mysql2/promise";

import { environment } from "./env.config.js";
import { DATABASE_CONSTANTS } from "../constants/database.constants.js";

export const databasePool = mysql.createPool({
    host: environment.database.host,
    port: environment.database.port,
    user: environment.database.user,
    password: environment.database.password,
    database: environment.database.name,
    waitForConnections: DATABASE_CONSTANTS.WAIT_FOR_CONNECTIONS,
    connectionLimit: DATABASE_CONSTANTS.CONNECTION_LIMIT,
    queueLimit: DATABASE_CONSTANTS.QUEUE_LIMIT,
});

export const verifyDatabaseConnection = async () => {
    const connection = await databasePool.getConnection();

    try {
        await connection.ping();
        console.log("MySQL connected successfully");
    } finally {
        connection.release();
    }
};

export const closeDatabasePool = async () => {
    await databasePool.end();
};