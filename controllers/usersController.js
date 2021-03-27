const jwt = require('jsonwebtoken')

const usersController = (User) =>{
  const getUsers = async (req,res)=> {
    try {
      const {query} = req

      console.log(query)
      //uso comando de mongo y con el find sin parametros traigo todo
      const response = await User.find(query)

      return res.json(response)
    } catch(error){
      throw error
    }
  }
    
  const postUser = async (req,res) => {
    try {
      const {body} = req
      const newUserName = () =>{
        if(body.lastName && body.firstName){ 
          //solo tomo el primer nombre o apellido ingresado
          const splitFirstName = body.firstName.split(" ")
          const splitLastName = body.lastName.split(" ")
          return ( splitLastName[0].toUpperCase() + "-"+ splitFirstName[0])
        } else {
          return body.email ? body.email : 'Usuario'
        }
        }
      const newpassword = () => {
        return body.password
      }
      const userObject = 
      {
        ...body,
        userName: newUserName(),
        password: newpassword()
        /* firstName: body.firstName, 
        lastName: body.lastName,
        userName: newUserName(),
        password: body.password,
        email: body.email,
        address: body.address,
        phone: body.phone*/
      }
      
      const user = new User (userObject)

      await user.save()
      return res.status(201).json(user)
    } catch (err) {
      //console.log('el error es:' + err)
      if (err.name === "ValidationError") {
        let errors = {};
  
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
  
        return res.status(400).send(errors);
      }
      res.status(500).send("Something went wrong");
    }
  }
  
  const postUserLogin = async (req, res) => {
    try{
      const {body} = req
      const foundUser = await User.findOne ({"userName": body.userName})
      //console.log('postUserlogin ==> ', foundUser)
      if (foundUser && foundUser.password == req.body.password) {
        const token = await jwt.sign({userName: foundUser.userName}, 'MyOldSecret', { expiresIn: 120 })
        console.log('token', token )
        return  res.status(201).json({message: 'User Validated OK', token})
      }
    }catch (err) {
      throw  console.log('el error es:' + err)
    }
  }

  
  const getUserById = async (req,res)=> {
      try {
      const {params} = req
      const response = await User.findById(params.userId)

      return res.json(response)
    } catch(error){
      console.log(' getUserById el error es:' + error)
      throw error
    }
  }
  
  const putUser = async (req,res)=> {
      try {
      const {params, body} = req
      const response = await User.updateOne({
          _id: params.userId 
      }, {
          $set: {
              firstName: body.firstName,
              lastName: body.lastName,
              userName: body.userName,
              password: body.password,
              email: body.email,
              address: body.address,
              phone: body.phone,
              yearBirthday: body.yearBirthday
          }
      })
      return res.status(202).json(response)
    } catch(error){
      throw error
    }
  }

  const deleteUser = async (req, res) => {
      try {
      const {params} = req
      console.log(params)
      const response = await User.findByIdAndDelete(
          params.userId
      )
      return res.status(202).json({message:'El usuario fue eliminado'})
    } catch(error){
      throw error
    }
  }

   return {getUsers , postUser, getUserById , putUser, deleteUser , postUserLogin }
} 

module.exports = usersController