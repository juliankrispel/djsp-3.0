const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../stories'),
      }
    ]
  },

  resolve: {
    alias: {
      'djsp.selection-position': path.resolve(__dirname, '..', 'plugins', 'djsp.selection-position'),
      'djsp.autocomplete': path.resolve(__dirname, '..', 'plugins', 'djsp.autocomplete'),
      'djsp.popover': path.resolve(__dirname, '..', 'plugins', 'djsp.popover'),
      'djsp.entity-decorator': path.resolve(__dirname, '..', 'plugins', 'djsp.entity-decorator'),
    }
  }
}
