import { Router } from "express";

import { API_ROUTES } from "../constants/route.constants.js";

import {
    getOrdersPerDayController,
    getRevenuePerStoreController,
    getTopSellingItemsController,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get(
    `${API_ROUTES.ANALYTICS.BASE}${API_ROUTES.ANALYTICS.ORDERS_PER_DAY}`,
    getOrdersPerDayController
);

router.get(
    `${API_ROUTES.ANALYTICS.BASE}${API_ROUTES.ANALYTICS.REVENUE_PER_STORE}`,
    getRevenuePerStoreController
);

router.get(
    `${API_ROUTES.ANALYTICS.BASE}${API_ROUTES.ANALYTICS.TOP_SELLING_ITEMS}`,
    getTopSellingItemsController
);

export default router;