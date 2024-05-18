const Joi = require("joi");
const medicationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
});
const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  contactNumber: Joi.string().required(),
});

module.exports = { medicationSchema, customerSchema };
