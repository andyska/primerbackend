//archivo especifico para que maneje los endpoints
const express = require('express')
const booksController = require('../controllers/booksController')
const booksValidations = require('../validations/booksvalidations.js')

//const Joi = require('joi')
const validation = require('express-joi-validation').createValidator()
/*
const bodySchema = Joi.object({
  title: Joi.string().required().min(2).max(50),
  author:  Joi.string().required(),
  genre:  Joi.string().required(),
  read:   Joi.boolean().required()

})*/
const routes = (Book)=>{
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(
      validation.query(booksValidations.querySchema), 
      controller.getBooks
    ) //este es el endpoint
    
    .post(
    validation.body(booksValidations.bodySchema) ,
    controller.postBook
    )
    
  bookRouter.route('/books/:bookId')
    .get(
      validation.params(booksValidations.paramsSchema) , 
      controller.getBookById 
    ) 
    .put(
      validation.params(booksValidations.paramsSchema), 
      validation.body(booksValidations.bodySchema) , 
      controller.putBook
    )
    .delete(validation.params(booksValidations.paramsSchema),controller.deleteBook )

  //salida de la funcion de rutas
  return bookRouter
}

//exporto la funcion para poder convocarla
module.exports = routes