const Koa = require('koa')
const InitManager = require('./core/init')
const InitSwagger = require('./core/swagger')

const app = new Koa()

InitManager.initCore(app)
new InitSwagger(app)

app.listen(3000, '0.0.0.0', () => console.log('http://localhost:3000'))