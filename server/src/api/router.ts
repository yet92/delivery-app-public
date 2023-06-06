import { Router } from "express";
import { router as shopsRouter } from "./shops";
import { router as productsRouter } from "./products";
import { router as ordersRouter } from "./orders";

const router = Router();

router.use("/api/shops", shopsRouter);
router.use("/api/products", productsRouter);
router.use("/api/orders", ordersRouter);

export { router };
