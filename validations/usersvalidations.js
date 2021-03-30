const Joi = require('joi')

const bodySchema = Joi.object({
  firstName: Joi.string().alphanum().required().min(3).max(50),
  lastName: Joi.string().required().min(3).max(50),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required()
})

const paramsSchema = Joi.object({
  bookId: Joi.string().required()
})

const querySchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    userName: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
    address: Joi.string(),
    phone: Joi.string()
})

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})
   
//exporto es esquema de validacion para poder convocarla
module.exports = { bodySchema, paramsSchema, querySchema, loginSchema }