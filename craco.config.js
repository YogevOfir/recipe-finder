module.exports = {
  webpack: {
    configure: {
      watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/
      }
    }
  },
  devServer: {
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
    client: {
      overlay: true,
      progress: true
    }
  }
}; 