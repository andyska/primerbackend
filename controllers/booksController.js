const booksController = (Book) =>{
  const getBooks = async (req,res)=> {
    try {
      const {query} = req
      //uso comando de mongo y con el find sin parametros traigo todo
      const response = await Book.find(query)

      return res.json(response)
    } catch(error){
      throw error
    }
  }
    
  const postBook = async (req,res)=> {
    try {
      //lo que viene en el json  uso para instanciar mi objeto
      console.log("body", req)
      const book = new Book( req.body )
      
      await book.save()
      return res.status(201).json(book)
    }catch(error) {
      throw error
    }
  }

  const getBookById = async (req,res)=> {
    try {
      const {params} = req
      
      const response = await Book.findById(params.bookId)
      
      if ( response && response !== null) {
        return res.json(response)
      } else {
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      console.log('getBookById - salio con error', error)
      throw error
    }
  }

  const putBook = async (req,res)=> {
      try {
      const {params, body} = req
      const response = await Book.updateOne({
          _id: params.bookId 
      }, {
          $set: {
              title: body.title,
              author: body.author,
              genre: body.genre,
              read: body.read
          }
      })

      if(response && response !== null) {
        return res.status(202).json(response)
      }
      else{
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      console.log('putBook - salio con error', error)
      throw error
    }
  }

  const deleteBook = async (req, res) => {
    try {
      const {params} = req
      const response = await Book.findByIdAndDelete( params.bookId )

      if ( response && response !== null) {
        return res.status(202).json({message:'Book Deleted'})
      } else {
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      throw error
    }
  }

    return {getBooks, postBook, getBookById , putBook, deleteBook }
  } 

module.exports = booksController