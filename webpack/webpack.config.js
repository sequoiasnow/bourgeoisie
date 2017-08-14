const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = env => {
  const ifProd = (plugin) => env.prod ? plugin : undefined
  const removeEmpty = (array) => array.filter(p => !!p)

  return {
    /**
     * Tell webpack where to look for the application, use this to 
     * backtrace the origins of your app. 
     */
    entry: { 
      app: path.join(__dirname, '../src/index.tsx') 
    },
    /**
     * Resolve allows a simple solution to have to type out the ending 
     * of the file.
     */
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            path.resolve(__dirname, '../src/'),
            'node_modules'
        ]
    },
      /**
       * Tell webpack where to put the files after running
       * 
       * > [name].[hash].js will compile to something unique for the hash
       * > and something common for the name. For the file App.js will 
       * > become app.ad069a0e8dc0e.js
       */
      output: {
          filename: '[name].[hash].js',
          path: path.resolve(__dirname, '../docs/')
      },
      /**
       * This is the root of all webpack functionality, the rules transform
       * simple files from one format to another.
       */
      module: {
          rules: [
              {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  include: path.join(__dirname, '../src'),
                  exclude: /node_modules/
              },
              {
                  test: /\.(scss|css)$/,
                  use: env.dev ?
                       [ 'style-loader',
                         'css-loader',
                         'sass-loader' ] :
                       ExtractTextPlugin.extract({ loader: 'css-loader?minimize!sass-loader' })
              }
          ] 
      },
      /**
       * Plugins manipulate the bundled output, such as minimizing or transforming.
       */
      plugins: removeEmpty([
          /**
           * Adds all the needed javascript and css files to the project html file.
           */
          new HtmlWebpackPlugin({
              template: path.join(__dirname, '../src/index.html'),
              filename: 'index.html',
              inject: 'body'
          }),
          new webpack.LoaderOptionsPlugin({
              minimize: env.prod,
              debug: env.dev 
          }),
          /**
           * Automatically gives react in every file.
           */,
          new webpack.ProvidePlugin({
              React: 'react'
          }),
          /**
           * Only extract the text for productionm otherwise simply store it in the
           * head element
           */ 
          ifProd(new ExtractTextPlugin({
              filename: '[name].[hash].css'
          })),
          ifProd(new webpack.optimize.UglifyJsPlugin({
              compress: {
                  'screw_ie8': true,
                  'warnings': false,
                  'unused': true,
                  'dead_code': true
              },
              output: {
                  comments: false
              },
              sourceMap: false
          }))
      ]) 
  }
}
