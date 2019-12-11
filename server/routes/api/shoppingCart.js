/* eslint-disable quotes */
import express from "express";
import auth from "../../middleware/auth";
import ShoppingCartController from "../../controllers/shoppingCartController";

const router = express.Router();

// shoppingCart endpoints
router.post("/cart", auth, ShoppingCartController.addItemToCart);
router.get("/cart", auth, ShoppingCartController.getAllItemsInCart);
router.delete("/cart/:cartId", auth, ShoppingCartController.deleteItemInCart);
router.patch("/cart/:cartId", auth, ShoppingCartController.updateItemInCart);

export default router;
