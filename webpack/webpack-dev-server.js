const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const path = require('path')

/**
 * When running the dev server are allways in production mode.
 */
const env = { dev: true }

const devServerConfig = {
  contentBase: path.join(__dirname, '../src/'),
  historyApiFallback: true, // Allows react-router to work with browserHistory.
  stats: { colors: true }
}

const server = new WebpackDevServer(webpack(webpackConfig(env)), devServerConfig)

server.listen(3000, 'localhost')
