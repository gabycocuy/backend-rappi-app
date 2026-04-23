import express from "express";
import { getStores, toggleStore } from "../controllers/stores.controller.js";

import { requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getStores);

router.patch("/:storeId/toggle", requireRole(["store"]), toggleStore);

export default router;
