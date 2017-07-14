const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = 3210

const mongoose = require('mongoose')
const Books = require('./models/books')

mongoose.connect(isProd ? 'mongodb://iseaz:1234@ds141108.mlab.com:41108/bookshop' : 'mongodb://localhost:27017/bookshop')
	.then(() => console.log('connected mongodb ' + isProd))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/books', (req, res) => {
	Books.find((err, books) => {
		if (err) {
			console.log(err)
		}

		res.json(books)
	})
})

app.post('/books', (req, res) => {
	const book = req.body

	Books.create(book, (err, books) => {
		if (err) {
			console.log(err)
		}

		res.json(books)
	})
})

app.put('/books/:_id', (req, res) => {
	let book = req.body
	let query = req.params._id

	let update = {
		'$set': {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	}

	let options = { new: true }

	Books.findOneAndUpdate(query, update, options, (err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.delete('/books/:_id', (req, res) => {
	let query = { _id: req.params._id }

	Books.remove(query, (err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.listen(port, err => {
	if (err) {
		return console.log(err)
	}

	console.log('API Server is running.')
})