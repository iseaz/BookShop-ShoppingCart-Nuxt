module.exports = {
	css: [
		{ src: '~assets/scss/bundle.scss', lang: 'scss' }
	],
	cache: {
    	max: 1000,
		maxAge: 900000
	},
	performance: {
    	prefetch: false
	}
}