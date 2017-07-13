<template>
	<header>
		<nuxt-link to="/">Home</nuxt-link> | <nuxt-link to="/admin">Admin</nuxt-link> | <nuxt-link to="/cart">Cart {{totalQuantity}}</nuxt-link>
	</header>
</template>

<script>
	export default {
		computed: {
			totalQuantity(){
				return this.$store.getters.totalQuantity
			}
		}
	}
</script>

<style scoped>
	header {
		height: 77px;
	}
</style>