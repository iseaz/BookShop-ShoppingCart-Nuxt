const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	quantity: Number
})

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart