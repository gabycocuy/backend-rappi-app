import express from "express";
import {
  createOrder,
  getConsumerOrders,
  getAvailableOrders,
  acceptOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/consumer/:userId", getConsumerOrders);

router.get("/available", getAvailableOrders);
router.post("/:orderId/accept", acceptOrder);

export default router;
