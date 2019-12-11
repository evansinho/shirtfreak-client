/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import express from "express";
import customerRouter from "./customer";
import productRouter from "./product";
import shoppingCartRouter from "./shoppingCart";

const router = express.Router();

router.use("/", customerRouter);
router.use("/", productRouter);
router.use("/", shoppingCartRouter);

export default router;
