/* eslint-disable quotes */
import express from "express";
import AuthController from "../../controllers/authController";
import auth from "../../middleware/auth";

const router = express.Router();

// Auth endpoints
router.post("/", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/edit", auth, AuthController.editProfile);

export default router;
