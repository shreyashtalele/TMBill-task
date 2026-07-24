import { APP_MESSAGES } from "@/constants/app-messages";

export function getApiError(error) {
    if (!error?.response) {
        return APP_MESSAGES.NETWORK_ERROR;
    }

    return (
        error.response.data?.message ||
        APP_MESSAGES.SOMETHING_WENT_WRONG
    );
}