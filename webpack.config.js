const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (env, options) =>  {
  const isDevMode = options.mode !== 'production'
  console.log('>', options.mode, process.env.NODE_ENV)
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            isDevMode 
              ? { loader: 'style-loader' }
              : MiniCssExtractPlugin.loader,
            { 
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            { 
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/templates/index.html'),
        filename: "index.html"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/templates/page2.html'),
        filename: "page2.html"
      }),
      new MiniCssExtractPlugin({
        filename: 'main.css'
      })
    ]
  }
}