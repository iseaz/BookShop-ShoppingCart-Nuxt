import axios from 'axios'

export const totals = (payloadArr) => {
	const totalAmount = payloadArr.map(cartArr => {
		return cartArr.price * cartArr.quantity
	}).reduce((a, b) => a + b, 0)

	const totalQuantity = payloadArr.map(cartArr => {
		return cartArr.quantity
	}).reduce((a, b) => a + b, 0)

	return {
		amount: totalAmount.toFixed(2),
		qty: totalQuantity
	}
}

const state = {
	cart: [],
	totalAmount: 0,
	totalQuantity: 0
}

const mutations = {
	'GET_CART'(state, payload){
		state.cart = payload
		state.totalAmount = totals(payload).amount
		state.totalQuantity = totals(payload).qty
	},
	'ADD_TO_CART'(state, payload){
		state.cart = [...state.cart, ...payload]
		state.totalAmount = totals(state.cart).amount
		state.totalQuantity = totals(state.cart).qty
	},
	'DELETE_CART'(state, _id){
		const currentCartToDelete = [...state.cart]
		const indexToDelete = currentCartToDelete.findIndex(cart => {
			return cart._id == _id
		})

		state.cart = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete+1)]
		state.totalAmount = totals(state.cart).amount
		state.totalQuantity = totals(state.cart).qty

		axios.post('/api/cart', state.cart).then(resp => resp.data)
	},
	'UPDATE_CART'(state, payload){
		state.cart = payload

		state.totalAmount = totals(payload).amount
		state.totalQuantity = totals(payload).qty
	}
}

const actions = {
	getCart({ commit }){
		axios.get('/api/cart').then(resp => {
			if (resp.data == 'no data') {
				return []
			}

			commit('GET_CART', resp.data)
		})
	},
	addToCart({ commit }, payload){
		axios.post('/api/cart', payload)
			.then(resp => {
				commit('ADD_TO_CART', resp.data)
			})
	},
	deleteCart({ commit }, _id){
		commit('DELETE_CART', _id)
	},
	updateCart({ commit }, payload){
		const currentCartToUpdate = payload.cart
		const indexToUpdate = currentCartToUpdate.findIndex(cart => {
			return cart._id == payload._id
		})

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
		}

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)]
		
		axios.post('/api/cart', cartUpdate)
			.then(resp => {
				console.log(resp.data)
				commit('UPDATE_CART', resp.data)
			})
	}
}

const getters = {
	cart(state){
		return state.cart
	},
	totalAmount(state){
		return state.totalAmount
	},
	totalQuantity(state){
		return state.totalQuantity
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}