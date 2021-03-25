//archivo especifico para que maneje los endpoints de usuarios
const express = require('express')
const usersController = require('../controllers/usersController')
const Joi = require('joi')
const validation = require('express-joi-validation').createValidator()

const routes = (User)=>{
    const userRouter = express.Router()
    const controller = usersController(User)

    userRouter.route('/users')
      .get(controller.getUsers) //este es el endpoint
      .post(controller.postUser)

    userRouter.route('/users/:userId')
      .get(controller.getUserById) 
      .put(controller.putUser)
      .delete(controller.deleteUser)
        
    userRouter.route('/users/login')
      .post(controller.postUserLogin)
     
  //salida de la funcion de rutas
  return userRouter
}

//exporto la funcion para poder convocarla
module.exports = routes