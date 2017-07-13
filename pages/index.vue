<template>
	<div class="row">
		<BooksList />
	</div>
</template>

<script>
	import BooksForm from '../components/BooksForm.vue'
	import BooksList from '../components/BooksList.vue'

	export default {
		components: {
			BooksForm,
			BooksList
		},
		methods: {
			postBook(){
				const book = [{
					_id: 5,
					title: 'book5',
					description: 'desc5',
					price: 899
				}]

				this.$store.dispatch('postBook', book)
			},
			deleteBook(_id){
				this.$store.dispatch('deleteBook', _id)
			},
			updateBook(book){
				this.$store.dispatch('updateBook', book)
			}
		}
	}
</script>