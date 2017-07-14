<template>
	<div class="col-xs-12 col-sm-6 col-md-4">
		<div class="well">
			<h5>{{title}}</h5>
			<p>{{description}}</p>
			<h6>{{price}} - $USD</h6>
			<button class="btn btn-sm btn-primary" @click="addToCart()">Buy now</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['_id', 'title', 'description', 'price'],
		computed: {
			cart(){
				return this.$store.getters.cart
			}
		},
		methods: {
			addToCart(){
				const book = [{
					_id: this._id,
					title: this.title,
					description: this.description,
					price: this.price,
					quantity: 1
				}]

				if (this.cart.length > 0) {
					let _id = this._id
					let cartIndex = this.cart.findIndex(cart => {
						return cart._id == _id
					})

					if (cartIndex == -1) {
						this.$store.dispatch('addToCart', book)
					} else {
						this.$store.dispatch('updateCart', {
							_id,
							unit: 1,
							cart: this.cart
						})
					}
				} else {
					this.$store.dispatch('addToCart', book)
				}
			}
		}
	}
</script>