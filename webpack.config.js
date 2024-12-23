const path = require('path'); // Menambahkan import path
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin

module.exports = {
  entry: './src/app.ts',  // Sesuaikan dengan path entry file kamu
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist')  // Pastikan output file ditempatkan di direktori dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // file HTML pertama
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './public/users.html', // file HTML kedua
      filename: 'users.html'
    }),
    new HtmlWebpackPlugin({
      template: './public/listDev.html', // file HTML ketiga
      filename: 'listDev.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],  // Resolusi untuk file .ts dan .js
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // Menangani file TypeScript
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Folder yang berisi index.html
    },
    port: 3000,
    open: true,
    historyApiFallback: false, //matikan jika tidak refresh
  },
  mode: 'development'
};
