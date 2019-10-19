/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkSignup, checkSignin } from "../middleware/inputValidations";
import models from "../models";

dotenv.config();
const SECRET = process.env.JWT_KEY;
const { Customer } = models;

/**
 *  Customer class
 */
class AuthController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} A new user
   * @description register a new customer
   */
  static async signUp(req, res) {
    try {
      const { error } = checkSignup.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ status: 400, error: error.details[0].message });
      }

      const { name, email, password } = req.body;
      const user = await Customer.findOne({ where: { email } });
      if (user) {
        return res
          .status(400)
          .json({ status: 409, error: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Customer.create({
        name,
        email,
        password: hashedPassword
      });
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, {
        expiresIn: "24h"
      });
      return res
        .header("token", token)
        .status(201)
        .json({
          data: {
            id: newUser.id,
            token,
            name: newUser.name,
            email: newUser.email
          }
        });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} A signed in user
   * @description sign in a customer
   */
  static async signIn(req, res) {
    try {
      const { error } = checkSignin.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ status: 400, error: error.details[0].message });
      }

      const { email, password } = req.body;
      const user = await Customer.findOne({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ status: 401, error: "Invalid email or password." });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ status: 401, error: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: "24hr"
      });
      return res
        .header("token", token)
        .status(200)
        .json({
          data: {
            id: user.id,
            token,
            email: user.email
          }
        });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Object} the edited data
   * @descriptions  edits user's profile
   */
  static async editProfile(req, res) {
    try {
      const {
        address1,
        address2,
        city,
        region,
        postalCode,
        country,
        dayPhone,
        evePhone,
        mobPhone,
        shippingRegionId
      } = req.body;
      const userId = req.user.id;
      const user = await Customer.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "customer does not exist"
        });
      }
      if (user.id !== userId) {
        return res.status(403).json({
          message: "Access Denied!"
        });
      }
      await Customer.update({
        address_1: address1 || user.address_1,
        address_2: address2 || user.address_2,
        city: city || user.city,
        region: region || user.region,
        postal_code: postalCode || user.postal_code,
        country: country || user.country,
        day_phone: dayPhone || user.dayPhone,
        eve_phone: evePhone || user.eve_phone,
        mob_phone: mobPhone || user.mob_phone,
        shipping_region_id: shippingRegionId || user.shipping_region_id
      });
      res.status(200).json({
        message: "profile updated"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error
      });
    }
  }
}

export default AuthController;
