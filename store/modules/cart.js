const state = {
	cart: []
}

const mutations = {
	'ADD_TO_CART'(state, payload){
		state.cart = [...state.cart, ...payload]
	},
	'DELETE_CART'(state, _id){
		const currentCartToDelete = [...state.cart]
		const indexToDelete = currentCartToDelete.findIndex(cart => {
			return cart._id == _id
		})

		state.cart = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete+1)]
	},
	'UPDATE_CART'(state, payload){
		const currentCartToUpdate = [...state.cart]
		const indexToUpdate = currentCartToUpdate.findIndex(cart => {
			return cart._id == payload._id
		})

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
		}

		state.cart = [
			...currentCartToUpdate.slice(0, indexToUpdate),
			newCart,
			...currentCartToUpdate.slice(indexToUpdate+1)
		]
	}
}

const actions = {
	addToCart({ commit }, payload){
		commit('ADD_TO_CART', payload)
	},
	deleteCart({ commit }, _id){
		commit('DELETE_CART', _id)
	},
	updateCart({ commit }, payload){
		commit('UPDATE_CART', payload)
	}
}

const getters = {
	cart(state){
		return state.cart
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}