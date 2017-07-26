<template>
	<div class="container">
		<app-header />
		<nuxt />
		<footer>&copy; Copyright 2017</footer>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'

	export default {
		components: {
			appHeader: Header
		},
		head: {
			title: 'Bookshop SSR with Nuxt.js and MongoDB',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
				{ charset: 'utf-8' }
			]
		},
		created(){
			this.$store.dispatch('getBooks')
		}
	}
</script>

<style scoped>
	footer {
		margin-top: 30px;
	}
</style>