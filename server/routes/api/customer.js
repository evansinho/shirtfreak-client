/* eslint-disable quotes */
import express from "express";
import AuthController from "../../controllers/authController";
import auth from "../../middleware/auth";

const router = express.Router();

// Auth endpoints
router.post("/customers", AuthController.signUp);
router.post("/customers/signin", AuthController.signIn);
router.patch("/customers", auth, AuthController.editProfile);

export default router;
