const mongoose = require("mongoose")

// la clase moongoose se extrae el schema
const {Schema} =  mongoose

// creo un objeto a partir de la clase schema
const bookModel = new Schema ({
    title: {type: String , required: true},
    author: {type: String, required: true},
    genre: {type: String},
    read: {type: Boolean}
},
{
  collection: 'books'
})

module.exports = mongoose.model( "Book", bookModel)
