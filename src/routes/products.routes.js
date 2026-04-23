import express from "express";
import {
  getProductsByStore,
  createProduct,
} from "../controllers/products.controller.js";

import { requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getProductsByStore);

router.post("/", requireRole(["store"]), createProduct);

export default router;
