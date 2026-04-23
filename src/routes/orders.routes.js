import express from "express";
import {
  createOrder,
  getConsumerOrders,
  getAvailableOrders,
  acceptOrder,
  getDeliveryOrders,
  getStoreOrders,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

import { requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", requireRole(["consumer"]), createOrder);

router.get("/consumer/:userId", requireRole(["consumer"]), getConsumerOrders);

router.get("/available", requireRole(["delivery"]), getAvailableOrders);

router.post("/:orderId/accept", requireRole(["delivery"]), acceptOrder);

router.get(
  "/delivery/:deliveryId",
  requireRole(["delivery"]),
  getDeliveryOrders,
);

router.get("/store/:storeId", requireRole(["store"]), getStoreOrders);

router.patch(
  "/:orderId/status",
  requireRole(["store", "delivery"]),
  updateOrderStatus,
);

export default router;
