export const SOCKET_EVENTS = Object.freeze({
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    JOIN_STORE: "store:join",
    LEAVE_STORE: "store:leave",
    ORDER_CREATED: "order:created",
    ORDER_STATUS_UPDATED: "order:status-updated",
});

export const SOCKET_ROOMS = Object.freeze({
    STORE_PREFIX: "store:",
});