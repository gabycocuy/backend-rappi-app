import express from "express";
import {
  createOrder,
  getConsumerOrders,
  getAvailableOrders,
  acceptOrder,
  getDeliveryOrders,
  updateOrderPosition,
  getOrderById,
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

router.patch(
  "/:orderId/position",
  requireRole(["delivery"]),
  updateOrderPosition,
);

router.get("/:orderId", getOrderById);

export default router;
