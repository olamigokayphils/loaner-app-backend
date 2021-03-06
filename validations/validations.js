const Joi = require("@hapi/joi");

//REGISTRATION VALIDATION
const registerValidationSchema = Joi.object({
  phoneNumber: Joi.string().min(11).max(11).required(),
  fullname: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  state: Joi.string().min(3).required(),
  dob: Joi.date().required(),
  password: Joi.string().min(6),
});

//LOGIN VALIDATION
const loginValidationSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6),
});

// LOAN APPLICATION VALIDATION
const loanApplicationValidationSchema = Joi.object({
  amount: Joi.number().min(1000).max(50000).required(),
});

module.exports = { registerValidationSchema, loginValidationSchema, loanApplicationValidationSchema };
