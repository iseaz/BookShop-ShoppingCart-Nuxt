import booksData from '../../tmpData'

const state = {
	books: booksData
}

const mutations = {
	'GET_BOOKS'(state, payload){
		state.books = payload
	},
	'POST_BOOKS'(state, payload){
		state.books = [...state.books, ...payload]
	},
	'DELETE_BOOK'(state, _id){
		const currentBookToDelete = [...state.books]
		const indexToDelete = currentBookToDelete.findIndex(book => {
			return book._id == _id
		})

		state.books = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]
	},
	'UPDATE_BOOK'(state, payload){
		const currentBookToUpdate = [...state.books]
		const indexToUpdate = currentBookToUpdate.findIndex(book => {
			return book._id == payload._id
		})

		const newBook = {
			...currentBookToUpdate[indexToUpdate],
			title: payload.title + 'updated',
			description: payload.description + 'updated',
			price: payload.price + 77
		}

		state.books = [
			...currentBookToUpdate.slice(0, indexToUpdate),
			newBook,
			...currentBookToUpdate.slice(indexToUpdate+1)
		]
	}
}

const actions = {
	getBooks({ commit }, payload){
		commit('GET_BOOKS', booksData)
	},
	postBooks({ commit }, payload){
		commit('POST_BOOKS', payload)
	},
	deleteBook({ commit }, _id){
		commit('DELETE_BOOK', _id)
	},
	updateBook({ commit }, payload){
		commit('UPDATE_BOOK', payload)
	}
}

const getters = {
	books(state){
		return state.books
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}