/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
import { Sequelize } from "sequelize";
import models from "../models";

const { Product, AttributeValue, Department, Category } = models;

/**
 *  Product class
 */
class ProductController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} All products
   * @description customer can see all products in the database
   */
  static async getAllProducts(req, res) {
    try {
      const allProduct = await Product.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "discounted_price",
          "image"
        ],
        order: [[Sequelize.literal("RAND()")]],
        limit: 10
      });
      if (!allProduct) {
        return res.status(404).json({
          message: "No product at this moment"
        });
      }
      return res.status(200).json({
        allProduct
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} A single product
   * @description get a particular product from the database
   */
  static async getSingleProduct(req, res) {
    try {
      const { product_id } = req.params;
      const product = await Product.findByPk(product_id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: AttributeValue,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        ]
      });
      if (!product) {
        return res.status(404).json({
          message: "No product found"
        });
      }
      return res.status(200).json({
        product
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} All Department
   * @description get all departments in the database
   */
  static async getAllDepartments(req, res) {
    try {
      const departments = await Department.findAll({
        attributes: ["id", "name", "description"]
      });
      if (!departments) {
        return res.status(404).json({
          message: "No department available at the moment"
        });
      }
      return res.status(200).json({
        departments
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} All Categories
   * @description get all categories in the database
   */
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name", "description"]
      });
      if (!categories) {
        return res.status(404).json({
          message: "No category available at the moment"
        });
      }
      return res.status(200).json({
        categories
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} product departments
   * @description get all products in a particular department
   */
  static async getAllProductInADepartment(req, res) {
    try {
      const { department_id } = req.params;
      const products = await Department.findByPk(department_id, {
        attributes: ["id", "name", "description"],
        include: [
          {
            model: Category,
            attributes: ["id", "name", "description"],
            include: [
              {
                model: Product,
                attributes: ["id", "name", "image", "price", "discounted_price"]
              }
            ]
          }
        ]
      });
      if (!products) {
        return res.status(404).json({
          message: "No product for this particular department"
        });
      }
      return res.status(200).json({
        products
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} product categories
   * @description get all products in a particular category
   */
  static async getAllProductInACategory(req, res) {
    try {
      const { category_id } = req.params;
      const products = await Category.findByPk(category_id, {
        attributes: ["id", "name", "description"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "image", "price", "discounted_price"]
          }
        ]
      });
      if (!products) {
        return res.status(404).json({
          message: "No product for this particular category"
        });
      }
      return res.status(200).json({
        products
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }
}

export default ProductController;
