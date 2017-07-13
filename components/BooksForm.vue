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
		methods: {
			postBook(){
				const book = [{
					_id: Math.floor(Math.random() * 99),
					title: this.title,
					description: this.description,
					price: this.price
				}]

				this.$store.dispatch('postBooks', book)
				this.title = ''
				this.description = ''
				this.price = ''
			}
		}
	}
</script>