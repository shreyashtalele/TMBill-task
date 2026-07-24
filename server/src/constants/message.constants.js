export const RESPONSE_MESSAGES = Object.freeze({
    // Server
    API_RUNNING: "TMBill API is running",
    DATABASE_CONNECTED: "MySQL connected successfully",
    SERVER_STARTED: "Server started successfully",
    INTERNAL_SERVER_ERROR: "Something went wrong",
    ROUTE_NOT_FOUND: "Route not found",

    // Orders
    ORDER_CREATED: "Order created successfully",
    ORDERS_FETCHED: "Orders fetched successfully",
    ORDER_STATUS_UPDATED:
        "Order status updated successfully",
    ORDER_NOT_FOUND: "Order not found",

    // Socket
    INVALID_STORE_ID:
        "A valid store ID is required",
    STORE_JOINED:
        "Store room joined successfully",
    STORE_LEFT:
        "Store room left successfully",
    SOCKET_OPERATION_FAILED:
        "Socket operation failed",
    SOCKET_NOT_INITIALIZED:
        "Socket.IO server has not been initialized",

    SERVER_RUNNING: (port) =>
        `Server running at http://localhost:${port}`,

    SERVER_START_FAILED:
        "Failed to start server",

    SERVER_SHUTDOWN_STARTED: (signal) =>
        `${signal} received. Shutting down server`,

    SERVER_SHUTDOWN_COMPLETED:
        "Server shutdown completed successfully",

    SERVER_SHUTDOWN_FAILED:
        "Server shutdown failed",
    DATABASE_CONNECTION_FAILED:
        "Failed to connect to MySQL",

    SOCKET_EMIT_FAILED: (event) =>
        `Failed to emit socket event "${event}"`,
});