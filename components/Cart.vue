<template>
	<div>
		<div class="panel panel-primary" v-if="cart.length > 0">
			<div class="panel-heading">Cart</div>
			<div class="panel-body">
				<div class="panel" v-for="cart in cart">
					<div class="panel-body">
						<div class="row">
							<div class="col-xs-12 col-sm-4">
								<h6>{{cart.title}}</h6>
							</div>
							<div class="col-xs-12 col-sm-2">
								<h6>{{cart.price}}</h6>
							</div>
							<div class="col-xs-12 col-sm-2">
								<h6>qty <span class="label label-success">{{cart.quantity}}</span></h6>
							</div>
							<div class="col-xs-12 col-sm-4">
								<div class="btn-group" style="min-width: 300px;">
									<button 
										type="button" 
										class="btn btn-sm btn-default" 
										@click="onDecrement(cart._id, cart.quantity)">-</button>
									<button 
										type="button" 
										class="btn btn-sm btn-default" 
										@click="onIncrement(cart._id)">+</button>
									<button 
										type="button" 
										class="btn btn-sm btn-danger" 
										@click="deleteCart(cart._id)">Delete</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<h6>Total amount: {{totalAmount}}</h6>
						<button 
							class="btn btn-success btn-sm" 
							@click="onCheckout()">PROCEED TO CHECKOUT</button>
					</div>
				</div>
			</div>

			<div 
				class="modal fade" 
				:class="{in: showModal}" 
				tabindex="-1" 
				role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button 
								type="button" 
								class="close" 
								data-dismiss="modal" 
								aria-label="Close" 
								@click="closeModal()">
									<span aria-hidden="true">&times;</span>
								</button>
							<h4 class="modal-title">Thank you!</h4>
						</div>
						<div class="modal-body">
							<p>Your order has been saved.</p>
							<p>You will receive an email confirmation.</p>
						</div>
						<div class="modal-footer">
							<div class="rows">
								<div class="col-xs-6">total $: {{totalAmount}}</div>
							</div>
							<button 
								type="button" 
								class="btn btn-default" 
								data-dismiss="modal" 
								@click="closeModal()">Close</button>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->

			<div class="modal-overlay" :class="{in: showModal}"></div>
		</div>

		<div v-else> </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				showModal: false
			}
		},
		computed: {
			cart(){
				return this.$store.getters.cart
			},
			totalAmount(){
				return this.$store.getters.totalAmount
			}
		},
		created(){
			this.$store.dispatch('getCart')
		},
		methods: {
			deleteCart(_id){
				this.$store.dispatch('deleteCart', _id)
			},
			onIncrement(_id){
				this.$store.dispatch('updateCart', {
					_id,
					unit: 1,
					cart: this.cart
				})
			},
			onDecrement(_id, quantity){
				if (quantity > 1) {
					this.$store.dispatch('updateCart', {
						_id,
						unit: -1,
						cart: this.cart
					})
				}
			},
			onCheckout(){
				this.showModal = !this.showModal
			},
			closeModal(){
				this.showModal = false
			}
		}
	}
</script>

<style scoped>
	.modal-overlay {
		background-color: rgba(0, 0, 0, .7);
		bottom: 0;
		display: none;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 111;
	}
	.in {
		display: block !important;
	}
</style>