/* eslint-disable quotes */
import Joi from "joi";

export const checkSignup = Joi.object()
  .keys({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  })
  .unknown(true);

export const checkSignin = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});
