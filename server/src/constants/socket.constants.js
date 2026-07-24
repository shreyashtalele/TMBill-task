const SOCKET_ROOM_PREFIX = Object.freeze({
    STORE: "store",
});

export const SOCKET_EVENTS = Object.freeze({
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    ERROR: "error",

    JOIN_STORE: "join_store",
    LEAVE_STORE: "leave_store",

    STORE_JOINED: "store_joined",
    STORE_LEFT: "store_left",

    NEW_ORDER: "new_order",
    ORDER_STATUS_UPDATED: "order_status_updated",

    SOCKET_ERROR: "socket_error",
});

export const SOCKET_ROOMS = Object.freeze({
    STORE: (storeId) =>
        `${SOCKET_ROOM_PREFIX.STORE}:${storeId}`,
});