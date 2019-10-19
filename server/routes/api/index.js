/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import express from "express";
import customerRouter from "./customer";

const router = express.Router();

router.use("/customers", customerRouter);

export default router;
