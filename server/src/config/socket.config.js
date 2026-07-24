import { Server } from "socket.io";

import { environment } from "./env.config.js";
import {
    SOCKET_EVENTS,
    SOCKET_ROOMS,
} from "../constants/socket.constants.js";
import { RESPONSE_MESSAGES } from "../constants/message.constants.js";

const SOCKET_SERVER_CONFIG = Object.freeze({
    PATH: "/socket.io",
    METHODS: ["GET", "POST"],
});

const SOCKET_LOG_MESSAGES = Object.freeze({
    CONNECTED: (socketId) =>
        `Socket connected: ${socketId}`,

    DISCONNECTED: (socketId, reason) =>
        `Socket disconnected: ${socketId}. Reason: ${reason}`,

    JOINED_ROOM: (socketId, roomName) =>
        `Socket ${socketId} joined room ${roomName}`,

    LEFT_ROOM: (socketId, roomName) =>
        `Socket ${socketId} left room ${roomName}`,

    JOIN_ROOM_FAILED: (socketId) =>
        `Failed to join store room for socket ${socketId}`,

    LEAVE_ROOM_FAILED: (socketId) =>
        `Failed to leave store room for socket ${socketId}`,

    SOCKET_ERROR: (socketId) =>
        `Socket error for ${socketId}`,
});

let io = null;

const normalizeStoreId = (storeId) => {
    const parsedStoreId = Number(storeId);

    const isValidStoreId =
        Number.isInteger(parsedStoreId) &&
        parsedStoreId > 0;

    return isValidStoreId
        ? parsedStoreId
        : null;
};

const emitSocketError = (socket, message) => {
    socket.emit(SOCKET_EVENTS.SOCKET_ERROR, {
        success: false,
        message,
    });
};

const handleJoinStore = async (socket, storeId) => {
    try {
        const normalizedStoreId =
            normalizeStoreId(storeId);

        if (!normalizedStoreId) {
            emitSocketError(
                socket,
                RESPONSE_MESSAGES.INVALID_STORE_ID
            );

            return;
        }

        const roomName =
            SOCKET_ROOMS.STORE(normalizedStoreId);

        await socket.join(roomName);

        socket.emit(SOCKET_EVENTS.STORE_JOINED, {
            success: true,
            message: RESPONSE_MESSAGES.STORE_JOINED,
            data: {
                store_id: normalizedStoreId,
                room: roomName,
            },
        });

        console.log(
            SOCKET_LOG_MESSAGES.JOINED_ROOM(
                socket.id,
                roomName
            )
        );
    } catch (error) {
        console.error(
            SOCKET_LOG_MESSAGES.JOIN_ROOM_FAILED(
                socket.id
            ),
            error
        );

        emitSocketError(
            socket,
            RESPONSE_MESSAGES.SOCKET_OPERATION_FAILED
        );
    }
};

const handleLeaveStore = async (socket, storeId) => {
    try {
        const normalizedStoreId =
            normalizeStoreId(storeId);

        if (!normalizedStoreId) {
            emitSocketError(
                socket,
                RESPONSE_MESSAGES.INVALID_STORE_ID
            );

            return;
        }

        const roomName =
            SOCKET_ROOMS.STORE(normalizedStoreId);

        await socket.leave(roomName);

        socket.emit(SOCKET_EVENTS.STORE_LEFT, {
            success: true,
            message: RESPONSE_MESSAGES.STORE_LEFT,
            data: {
                store_id: normalizedStoreId,
                room: roomName,
            },
        });

        console.log(
            SOCKET_LOG_MESSAGES.LEFT_ROOM(
                socket.id,
                roomName
            )
        );
    } catch (error) {
        console.error(
            SOCKET_LOG_MESSAGES.LEAVE_ROOM_FAILED(
                socket.id
            ),
            error
        );

        emitSocketError(
            socket,
            RESPONSE_MESSAGES.SOCKET_OPERATION_FAILED
        );
    }
};

const registerStoreRoomEvents = (socket) => {
    socket.on(
        SOCKET_EVENTS.JOIN_STORE,
        (storeId) =>
            handleJoinStore(socket, storeId)
    );

    socket.on(
        SOCKET_EVENTS.LEAVE_STORE,
        (storeId) =>
            handleLeaveStore(socket, storeId)
    );
};

const registerConnectionEvents = (socket) => {
    console.log(
        SOCKET_LOG_MESSAGES.CONNECTED(socket.id)
    );

    registerStoreRoomEvents(socket);

    socket.on(
        SOCKET_EVENTS.DISCONNECT,
        (reason) => {
            console.log(
                SOCKET_LOG_MESSAGES.DISCONNECTED(
                    socket.id,
                    reason
                )
            );
        }
    );

    socket.on(
        SOCKET_EVENTS.ERROR,
        (error) => {
            console.error(
                SOCKET_LOG_MESSAGES.SOCKET_ERROR(
                    socket.id
                ),
                error
            );
        }
    );
};

export const initializeSocket = (httpServer) => {
    if (io) {
        return io;
    }

    io = new Server(httpServer, {
        path: SOCKET_SERVER_CONFIG.PATH,
        serveClient: true,
        cors: {
            origin: environment.clientUrl,
            credentials: true,
            methods: SOCKET_SERVER_CONFIG.METHODS,
        },
    });

    io.on(
        SOCKET_EVENTS.CONNECTION,
        registerConnectionEvents
    );

    return io;
};

export const getSocketServer = () => {
    if (!io) {
        throw new Error(
            RESPONSE_MESSAGES.SOCKET_NOT_INITIALIZED
        );
    }

    return io;
};

export const closeSocketServer = async () => {
    if (!io) {
        return;
    }

    await new Promise((resolve) => {
        io.close(resolve);
    });

    io = null;
};