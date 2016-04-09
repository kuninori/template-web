module.exports = {
  entry: {
    script: "./src/js/script.jsx"
  },
  output: {
    path: __dirname + "/app/",
    filename: "js/[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};