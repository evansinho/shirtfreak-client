/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
import models from "../models";

const { Product, AttributeValue, ShoppingCart, Customer } = models;

/**
 *  Shopping cart class
 */
class ShoppingCartController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} shopping cart
   * @description customer can add  products to cart
   */
  static async addItemToCart(req, res) {
    try {
      const { productId, attributes, quantity } = req.body;
      const userId = req.user.id;
      const attributeArray = [];
      const attributeValue = await attributes.forEach(value =>
        // eslint-disable-next-line implicit-arrow-linebreak
        AttributeValue.findOne({
          where: {
            value: {
              $eq: value
            }
          }
        })
      );

      if (!attributeValue) {
        return res.status(400).json({
          message: "The attribute value provided does not exist"
        });
      }
      attributeArray.push(attributeValue.dataValues.value);
      const attributeString = attributeArray.toString();

      const item = await Product.find({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        where: {
          id: productId
        }
      });
      if (!item) {
        return res.status(404).json({
          message: "Item not found"
        });
      }

      const cart = await ShoppingCart.create({
        product_id: productId,
        customer_id: userId,
        attributes: attributeString,
        quantity
      });
      return res.status(200).json({
        cart,
        totalItems: quantity,
        message: "Item added to cart successfully"
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
   * @returns {Object} shopping cart
   * @description customer can view all items in the shopping cart
   */
  static async getAllItemsInCart(req, res) {
    try {
      const items = await ShoppingCart.findAndCountAll({
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          },
          {
            model: Customer
          }
        ],
        where: {
          customer_id: req.user
        }
      });
      if (!items) {
        return res.status(200).json({
          message: "No item in the cart at the moment"
        });
      }
      const quantityArray = [];
      const totalArray = [];
      const discountArray = [];
      items.rows.map(item => {
        const price = parseFloat(item.quantity * item.Product.price);
        const discount = parseFloat(item.Product.discounted_price);
        totalArray.push(price);
        discountArray.push(discount);
        quantityArray.push(item.quantity);
        return null;
      });
      if (quantityArray.length > 0) {
        const totalItems = quantityArray.reduce(
          (preValue, nextValue) => preValue + nextValue
        );
        const subTotal = totalArray.reduce((prev, curr) => prev + curr);
        const totalDiscount = discountArray.reduce((prev, curr) => prev + curr);
        const finalPrice = subTotal - totalDiscount;
        return res.status(200).json({
          totalItems,
          subTotal,
          totalDiscount,
          finalPrice,
          items
        });
      }
      return res.status(200).json({
        message: "No item in the cart at the moment",
        totalItems: 0
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
   * @returns {Object} a mesage
   * @description customer can delete all items from the cart
   */
  static async deleteItemInCart(req, res) {
    try {
      const { cartId } = req.params;
      const item = await ShoppingCart.findOne({
        where: {
          id: cartId,
          customer_id: req.user
        }
      });
      if (!item) {
        return res.status(400).json({
          message: "Item not found in the cart"
        });
      }
      item.destroy();
      return res.status(200).json({
        message: "successfully deleted"
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
   * @returns {Object} item and quantity count
   * @description customer can update item quantity
   */
  static async updateItemInCart(req, res) {
    try {
      const { cartId } = req.params;
      const { quantity } = req.body;
      const item = await ShoppingCart.findOne({
        where: {
          id: cartId,
          customer_id: req.user
        }
      });
      if (!item) {
        return res.status(404).json({
          message: "Item not found in the cart"
        });
      }
      item.update({
        quantity: quantity || item.quantity
      });
      return res.status(200).json({
        updatedItem: {
          item
        },
        totalItems: item.quantity
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        err
      });
    }
  }
}

export default ShoppingCartController;
