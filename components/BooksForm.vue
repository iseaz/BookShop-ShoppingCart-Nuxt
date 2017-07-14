<template>
	<div class="well">
		<div class="panel">
			<div class="panel-body">
				<div class="form-group">
					<label for="title" class="control-label">Title</label>
					<input 
						type="text" 
						placeholder="Enter Title" 
						id="title" 
						class="form-control" 
						v-model="title">
				</div>

				<div class="form-group">
					<label for="description" class="control-label">Description</label>
					<input 
						type="text" 
						placeholder="Enter Description" 
						id="description" 
						class="form-control" 
						v-model="description">
				</div>

				<div class="form-group has-feedback">
					<label for="price" class="control-label">Price</label>
					<input 
						type="text" 
						placeholder="Enter Price" 
						id="price" 
						class="form-control" 
						v-model="price">
				</div>
				
				<button 
					type="button" 
					class="btn btn-sm btn-primary" 
					@click="postBook()">Save book</button>
			</div>
		</div>

		<div class="panel panel-default" style="margin-top: 25px;">
			<div class="panel-body">
				<div class="form-group">
					<label for="formControlSelect" class="control-label">Select a book title to delete</label>
					<select placeholder="select" id="formControlSelect" class="form-control" ref="delete">
						<option value="select">Select</option>
						<option v-for="book in books" key="book._id" :value="book._id">{{book.title}}</option>
					</select>
				</div>

				<button type="button" class="btn btn-sm btn-danger" @click="deleteBook()">Delete book</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				title: '',
				description: '',
				price: ''
			}
		},
		computed: {
			books(){
				return this.$store.getters.books
			}
		},
		methods: {
			postBook(){
				const book = [{
					title: this.title,
					description: this.description,
					price: this.price
				}]

				this.$store.dispatch('postBooks', book)
				this.title = ''
				this.description = ''
				this.price = ''
			},
			deleteBook(){
				const bookId = this.$refs.delete.value

				this.$store.dispatch('deleteBook', bookId)
			}
		}
	}
</script>