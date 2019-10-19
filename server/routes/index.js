/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import express from "express";
import api from "./api";

const router = express.Router();

router.use("/api/v1", api);

module.exports = router;
