const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManager {
  static initCore(app) {
    //  入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    // InitManager.loadHttpException()
    // InitManager.loadConfig()
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/routes`
    // 自动导入某文件下的所有模块
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if(obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // static loadConfig(path = '') {
  //   const configPath = path || process.cwd() + '/config/config.js'
  //   const config = require(configPath)
  //   global.config = config
  // }

  // static loadHttpException() {
  //   const errors = require('./http-exception')
  //   global.errs = errors
  // }
}

module.exports = InitManager