const Nuxt = require('nuxt')
const express = require('express')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
// const http = require('http')
const app = express()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

const apiProxy = httpProxy.createProxyServer({
	target: 'http://localhost:3210'
})

// -------------------------------------------------------------------------

app.use('/api', (req, res) => {
	apiProxy.web(req, res)
})

require('./apiServer')

let config = require('./nuxt.config.js')
config.dev = !isProd
// config.router.base = isProd ? '/sea/nuxt/' : '/'
const nuxt = new Nuxt(config)

app.use(nuxt.render)

if (config.dev) {
	nuxt.build()
		.catch((error) => {
			console.error(error)
			process.exit(1)
		})
}

app.listen(port, '0.0.0.0')