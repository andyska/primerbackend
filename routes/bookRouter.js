//archivo especifico para que maneje los endpoints
const express = require('express')
const booksController = require('../controllers/booksController')
const Joi = require('joi')
const validation = require('express-joi-validation').createValidator()
const bodySchema = Joi.object({
  title: Joi.string().required().min(2).max(50),
  author:  Joi.string().required(),
  genre:  Joi.string().required(),
  read:   Joi.boolean().required()

})
const routes = (Book)=>{
    const bookRouter = express.Router()
    const controller = booksController(Book)

    bookRouter.route('/books')
      .get(controller.getBooks) //este es el endpoint
      .post(validation.body(bodySchema) ,controller.postBook)
      
    bookRouter.route('/books/:bookId')
      .get(controller.getBookById) 
      .put(validation.body(bodySchema) , controller.putBook)
      .delete(controller.deleteBook)

    bookRouter.route('/books/ByTitle/:bookTitle')
      .get(controller.getBookByTitle)

    bookRouter.route('/books/ByAuthor/:bookAuthor')
      .get(controller.getBooksByAuthor)

    //salida de la funcion de rutas
  return bookRouter
}

//exporto la funcion para poder convocarla
module.exports = routes