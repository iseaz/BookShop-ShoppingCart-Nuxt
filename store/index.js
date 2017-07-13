import Vuex from 'vuex'
import books from './modules/books'
import cart from './modules/cart'

const store = () => new Vuex.Store({
	modules: {
		books,
		cart
	}
})

export default store