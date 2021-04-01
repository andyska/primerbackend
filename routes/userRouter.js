//archivo especifico para que maneje los endpoints de usuarios
const express = require('express')
const usersController = require('../controllers/usersController')
const validation = require('express-joi-validation').createValidator()
const usersValidations = require('../validations/usersvalidations.js')


const routes = (User)=>{
    const userRouter = express.Router()
    const controller = usersController(User)

    userRouter.route('/users')
      .get(
        validation.query(usersValidations.querySchema), 
        controller.getUsers
      ) 
      .post(
        validation.body(usersValidations.bodySchema), 
        controller.postUser
      )

    userRouter.route('/users/:userId')
      .get(
        validation.params(usersValidations.paramsSchema), 
        controller.getUserById
      ) 
      .put(
        validation.params(usersValidations.paramsSchema), 
        validation.body(usersValidations.bodySchema), 
        controller.putUser
      )
      .delete(
        validation.params(usersValidations.paramsSchema), 
        controller.deleteUser
      )
        
    userRouter.route('/users/login')
      .post(
        validation.body(usersValidations.loginSchema),
        controller.postUserLogin
      )
     
  //salida de la funcion de rutas
  return userRouter
}

//exporto la funcion para poder convocarla
module.exports = routes