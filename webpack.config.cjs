const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'elp2000-82b.js',
    library: {
        name: "elp2000_82b",
        type: "umd",
    },
  },
};