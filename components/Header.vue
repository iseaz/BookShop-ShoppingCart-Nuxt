<template>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<nuxt-link to="/" class="navbar-brand">BS</nuxt-link>

				<button type="button" class="navbar-toggle" :class="{ collapsed: !showMenu }" @click="showMenu = !showMenu">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>

			<div class="navbar-collapse collapse" :class="{ in: showMenu }">
				<ul class="nav navbar-nav">
					<nuxt-link tag="li" to="/about" activeClass="active"><a>About</a></nuxt-link>
					<nuxt-link tag="li" to="/contact" activeClass="active"><a>Contact Us</a></nuxt-link>
				</ul>
				
				<ul class="nav navbar-nav navbar-right">
					<nuxt-link tag="li" to="/admin" activeClass="active"><a>Admin</a></nuxt-link>
					<nuxt-link tag="li" to="/cart" activeClass="active">
						<a>Your Cart <span class="badge badge" v-if="totalQuantity > 0">{{totalQuantity}}</span></a>
					</nuxt-link>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		data: () => ({
			showMenu: false
		}),
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