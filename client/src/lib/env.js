import { APP_MESSAGES } from "@/constants/app-messages";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!apiBaseUrl) {
    throw new Error(
        `${APP_MESSAGES.MISSING_ENVIRONMENT_VARIABLE} NEXT_PUBLIC_API_BASE_URL`
    );
}

if (!socketUrl) {
    throw new Error(
        `${APP_MESSAGES.MISSING_ENVIRONMENT_VARIABLE} NEXT_PUBLIC_SOCKET_URL`
    );
}

export const env = Object.freeze({
    apiBaseUrl,
    socketUrl,
});