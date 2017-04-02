module.exports = {
  entry: "./public/assets/es2015/app.es6",
  output: {
    filename: "./public/assets/javascript/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.es6$/, // test for file name
        exclude: /node_modules/,
        loader: 'babel-loader', // loader is equivalent to gulp/grunt task
        query: {
          presets: ['babel-preset-es2015'].map(require.resolve) 
          // need map to get it to work
        }
      }
    ],
  },
};
