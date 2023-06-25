const {defineConfig} = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = ({
    transpileDependencies: true,
    productionSourceMap: false,
    lintOnSave: false, // 关闭语法校验
    // gzip 压缩
    configureWebpack: {
        plugins: [
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    // 去掉console.log
    chainWebpack(config) {
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true
            return args
        })
    }
})
