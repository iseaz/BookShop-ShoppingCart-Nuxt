const Nuxt = require('nuxt')
const express = require('express')
const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

const mongoose = require('mongoose')
const Books = require('./models/books')
mongoose.connect('mongodb://iseaz:1234@ds141108.mlab.com:41108/bookshop')
	.then(() => console.log('connected mongodb'))

app.get('/books', (req, res) => {
	Books.find((err, books) => {
		if (err) {
			console.log(err)
		}

		res.json(books)
	})
})

app.use(nuxt.render)

if (config.dev) {
	nuxt.build()
		.catch((error) => {
			console.error(error)
			process.exit(1)
		})
}

app.listen(port, '0.0.0.0')