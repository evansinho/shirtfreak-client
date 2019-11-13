/* eslint-disable quotes */
import express from "express";
import ProductController from "../../controllers/productController";

const router = express.Router();

// Product endpoints
router.get("/products", ProductController.getAllProducts);
router.get("/product/:product_id", ProductController.getSingleProduct);
router.get("/departments", ProductController.getAllDepartments);
router.get("/categories", ProductController.getAllCategories);
router.get(
  "/department/:department_id",
  ProductController.getAllProductInADepartment
);
router.get(
  "/category/:category_id",
  ProductController.getAllProductInACategory
);

export default router;
