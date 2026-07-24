import { Router } from "express";

import orderRouter from "./order.routes.js";

const router = Router();

router.use(orderRouter);

export default router;