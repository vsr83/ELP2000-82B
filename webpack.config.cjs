const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'elp2000-82b.js',
    library: {
        name: "ELP2000-82B",
        type: "umd",
    },
  },
};