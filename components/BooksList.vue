<template>
	<div class="row">
		<div class="row">
			<Cart />
		</div>
		<div class="row">
			<BookItem 
				v-for="book in books" 
				key="book._id" 
				:_id="book._id" 
				:title="book.title" 
				:description="book.description" 
				:price="book.price" />
		</div>
	</div>
</template>

<script>
	import BookItem from './BookItem.vue'
	import Cart from './Cart.vue'

	export default {
		components: {
			BookItem,
			Cart
		},
		computed: {
			books(){
				return this.$store.getters.books
			}
		}
	}
</script>