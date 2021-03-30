// llamo al framework previa instalacion con npm express
const express = require('express')

//convoco a la base de datos
const mongoose = require('mongoose')
const Book = require('./models/bookmodel.js')
const User = require('./models/usermodel.js')
const bookRouter = require('./routes/bookRouter.js')(Book) // con estos parentesis ejecuto la funcion que viene del require
const userRouter = require('./routes/userRouter.js')(User)
const jwt = require('express-jwt')

//ejecuto express como si fuera una funcion
const app = express()

const bodyParser = require('body-parser')
//estas dos lineas me permiten formatear de cierta manera lo que envio
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/api/*', jwt( {secret:'Indio10072017', algorithms:['HS256'] } ).unless({path: ['/api/users/login']}))
app.use('/api', bookRouter)
app.use('/api', userRouter)

//me conecto a mongo
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/bookAPI")
  } catch (error){
    throw error
  }
}
connectDB() 

const port = 8080
//escucho el puerto localhost 8080
app.listen(port, ()=> {
  console.log(`server started on port : ${port}`)
})


