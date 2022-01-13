const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  module: {
	  rules: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
			options: { presets: ["@babel/env"] }
      },]
  }
};