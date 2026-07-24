import { Router } from "express";

import orderRouter from "./order.routes.js";
import archiveRouter from "./archive.routes.js";
import analyticsRouter from "./analytics.routes.js";

const router = Router();

router.use(orderRouter);
router.use(archiveRouter);
router.use(analyticsRouter);

export default router;