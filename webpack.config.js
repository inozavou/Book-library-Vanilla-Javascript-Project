const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to your HTML file
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // Serve static files from the dist folder
    },
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Enable SPA routing support
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Load and inject CSS
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Ensure compatibility with older JavaScript versions if necessary
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false, // Disable fs module because it's not needed in the browser
      path: require.resolve("path-browserify"), // Use path-browserify for compatibility in the browser
      util: require.resolve("util/"),
    },
  },
};
