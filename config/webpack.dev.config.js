const webpack = require('webpack')
const Portfinder = require('portfinder')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.base.config')
const { getIp, createNotifierCallback } = require('../scripts/utils')
const { port, proxy } = require('./config')

module.exports = (env, yml) => {
  const devConfig = merge(webpackBase(env), {
    devtool: 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /\.(global|module)\.(sa|sc|c)ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @use "@/assets/styles/variable.global.scss" as *;
                `
              }
            }
          ]
        },
        {
          test: /\.(global|module)\.(sa|sc|c)ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        ...env,
        ...yml,
        __VUE_OPTIONS_API__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
      })
    ],
    devServer: {
      port,
      proxy,
      compress: true,
      hot: true,
      historyApiFallback: true,
      // historyApiFallback: {
      //   rewrites: [
      //     { from: /^\/$/, to: '/index.html' }
      //   ]
      // },
      server: 'https' // navigator.serviceWorker
    }
  })
  return new Promise((resolve, reject) => {
    Portfinder.getPort({
      port,
      stopPort: 65535
    }, (err, port) => {
      if (err) {
        reject(err)
      } else {
        createNotifierCallback()
        devConfig.devServer.port = port
        devConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            quiet: true,
            messages: [`Your application is running here ${devConfig.devServer.server}://${getIp()}:${devConfig.devServer.port}`]
          },
          onErrors: env === 'development' ? createNotifierCallback() : undefined
        }))
        resolve(devConfig)
      }
    })
  })
}
