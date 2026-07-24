import http from "http";

import app from "./app.js";

import {
    closeDatabasePool,
    verifyDatabaseConnection,
} from "./config/database.config.js";
import { environment } from "./config/env.config.js";
import {
    closeSocketServer,
    initializeSocket,
} from "./config/socket.config.js";

import { RESPONSE_MESSAGES } from "./constants/message.constants.js";

const PROCESS_SIGNALS = Object.freeze({
    INTERRUPT: "SIGINT",
    TERMINATE: "SIGTERM",
});

const EXIT_CODES = Object.freeze({
    SUCCESS: 0,
    FAILURE: 1,
});

const httpServer = http.createServer(app);

let isShuttingDown = false;

initializeSocket(httpServer);

const closeHttpServer = () =>
    new Promise((resolve, reject) => {
        if (!httpServer.listening) {
            resolve();
            return;
        }

        httpServer.close((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });

const startServer = async () => {
    try {
        await verifyDatabaseConnection();

        httpServer.listen(
            environment.port,
            () => {
                console.log(
                    RESPONSE_MESSAGES.SERVER_RUNNING(
                        environment.port
                    )
                );
            }
        );
    } catch (error) {
        console.error(
            RESPONSE_MESSAGES.SERVER_START_FAILED,
            error
        );

        process.exit(EXIT_CODES.FAILURE);
    }
};

const shutdownServer = async (signal) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    console.log(
        RESPONSE_MESSAGES.SERVER_SHUTDOWN_STARTED(
            signal
        )
    );

    try {
        await closeSocketServer();
        await closeHttpServer();
        await closeDatabasePool();

        console.log(
            RESPONSE_MESSAGES.SERVER_SHUTDOWN_COMPLETED
        );

        process.exit(EXIT_CODES.SUCCESS);
    } catch (error) {
        console.error(
            RESPONSE_MESSAGES.SERVER_SHUTDOWN_FAILED,
            error
        );

        process.exit(EXIT_CODES.FAILURE);
    }
};

process.once(
    PROCESS_SIGNALS.INTERRUPT,
    () =>
        shutdownServer(
            PROCESS_SIGNALS.INTERRUPT
        )
);

process.once(
    PROCESS_SIGNALS.TERMINATE,
    () =>
        shutdownServer(
            PROCESS_SIGNALS.TERMINATE
        )
);

startServer();