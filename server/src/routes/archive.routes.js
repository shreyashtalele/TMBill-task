import { Router } from "express";

import { API_ROUTES } from "../constants/route.constants.js";
import { archiveOldOrdersController } from "../controllers/archive.controller.js";

const router = Router();

router.post(
    API_ROUTES.ARCHIVE_OLD_ORDERS,
    archiveOldOrdersController
);

export default router;