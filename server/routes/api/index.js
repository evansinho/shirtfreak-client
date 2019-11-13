/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import express from "express";
import customerRouter from "./customer";
import productRouter from "./product";

const router = express.Router();

router.use("/", customerRouter);
router.use("/", productRouter);

export default router;
