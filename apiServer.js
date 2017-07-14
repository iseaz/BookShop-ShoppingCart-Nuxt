require('babel-core/register')({
	"presets": ['es2015', 'stage-1']
})

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const isProd = (process.env.NODE_ENV === 'production')

const mongoose = require('mongoose')
const Books = require('./models/books')
const Cart = require('./models/cart')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


mongoose.connect(isProd ? 'mongodb://iseaz:1234@ds141108.mlab.com:41108/bookshop' : 'mongodb://localhost:27017/bookshop')
let db = mongoose.connection
db.on('error', console.error.bind(console, '# MongoDB - connection error'))


// start session -----------------------------------------------------------
app.use(session({
	secret: 'secretString',
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000*60*60*24*2
	},
	store: new MongoStore({
		mongooseConnection: db,
		ttl: 2*24*60*60
	})
}))

app.post('/cart', (req, res) => {
	let cart = req.body
	req.session.cart = cart

	// if (req.session.cart) {
	// 	req.session.cart = [...req.session.cart, ...cart]
	// } else {
	// 	req.session.cart = cart
	// }

	req.session.save(err => {
		if (err) {
			throw err
		}

		res.json(req.session.cart)
	})
})

app.get('/cart', (req, res) => {
	if (typeof req.session.cart !== 'undefined') {
		res.json(req.session.cart)
	} else {
		res.send('no data')
	}
})
// end session -------------------------------------------------------------


// start api ---------------------------------------------------------------
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
// end api -----------------------------------------------------------------

app.listen(3210, err => {
	if (err) {
		return console.log(err)
	}

	console.log('API Server is running.')
})