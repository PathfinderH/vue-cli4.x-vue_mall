const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');


module.exports = {
    assetsDir: 'static',
    chainWebpack: config => {


        //发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                nprogress: 'NProgress',
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        //开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    },



    //rem布局配置
    // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    css: {

        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },


    devServer: {

        host: '127.0.0.1',
        open: true,
        port: 3500,

    },


};