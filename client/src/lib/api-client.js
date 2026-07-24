import axios from "axios";

import { env } from "@/lib/env";

const apiClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;