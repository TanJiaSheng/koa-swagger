const Router = require('koa-router')
const koaSwagger = require('koa2-swagger-ui').koaSwagger
const yamljs = require('yamljs')
const { getNameListFromFolder, readAndWriteFile } = require('../utils/index')
const router = new Router()
class InitSwagger {
    constructor(app) {
        this.init(app)
    }

    async init(app) {
        const yamls = getNameListFromFolder('../app/routes', '.yaml')
        yamls.unshift('/../config/api.yaml')
        try {
            const res = await readAndWriteFile(yamls, '/../openapi.yaml')
            const spec = yamljs.load('./openapi.yaml')
            router.use(koaSwagger({ swaggerOptions: { spec } }))
            router.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))
            app.use(router.routes())
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = InitSwagger
