// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
//         transpileDependencies: true,
//         lintOnSave: false,
//         devServer: {
//             // 本地配置
//             proxy: {
//                 '/api': {
//                     target: 'http://101.200.148.39:3458/api/controller/adminUser',//实际访问的ip
//                     changeOrigin: true,
//                     pathRewrite: {
//                         '^/api':''
//                     }
//                 }
//             }
//         }
//     }
// )
module.exports = {
    devServer: {
        host: 'localhost',  //前端ip，本地就是localhost或者127.0.0.1
        port: 8081,  //前端port
        //配置代理
        proxy: {
            '/api': {  //刚刚给axios.defaults.baseURL配置的
                target: 'http://101.200.148.39:3458/api/controller/adminUser',  //后端ip:port
                changeOrigin: true,  //解决跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
