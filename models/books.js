const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
	title: String,
	description: String,
	images: String,
	price: Number
})

const Books = mongoose.model('books', booksSchema)

module.exports = Books