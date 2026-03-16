import express from "express";
import { getProductsByStore } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProductsByStore);

export default router;
