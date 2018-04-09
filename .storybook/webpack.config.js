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
      'djsp.selection-position': path.resolve(__dirname, '..', 'packages', 'djsp.selection-position'),
      'djsp.autocomplete': path.resolve(__dirname, '..', 'packages', 'djsp.autocomplete'),
      'djsp.button': path.resolve(__dirname, '..', 'packages', 'djsp.button'),
      'djsp.utils': path.resolve(__dirname, '..', 'packages', 'djsp.utils'),
      'djsp.popover': path.resolve(__dirname, '..', 'packages', 'djsp.popover'),
      'djsp.entity-decorator': path.resolve(__dirname, '..', 'packages', 'djsp.entity-decorator'),
    }
  }
}
