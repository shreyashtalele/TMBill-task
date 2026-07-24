import http from "http";

import app from "./app.js";
import { environment } from "./config/env.config.js";
import {
    verifyDatabaseConnection,
    closeDatabasePool,
} from "./config/database.config.js";

const httpServer = http.createServer(app);

const startServer = async () => {
    try {
        await verifyDatabaseConnection();

        httpServer.listen(environment.port, () => {
            console.log(
                `Server running at http://localhost:${environment.port}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

const shutdownServer = async (signal) => {
    console.log(`${signal} received. Shutting down server...`);

    httpServer.close(async () => {
        try {
            await closeDatabasePool();
            console.log("Database connection pool closed");
            process.exit(0);
        } catch (error) {
            console.error("Shutdown failed:", error.message);
            process.exit(1);
        }
    });
};

process.on("SIGINT", () => shutdownServer("SIGINT"));
process.on("SIGTERM", () => shutdownServer("SIGTERM"));

startServer();