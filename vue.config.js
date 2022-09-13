const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{ //配置代理服务器
    proxy:{
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
