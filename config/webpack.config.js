const path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist/umd'),
    filename: 'svgeditor-simple-client.js',
    // library: 'libtest',
    libraryTarget: 'module',
    globalObject: 'this',
  },
  experiments: {
    //asyncWebAssembly: true,
    //buildHttp: true,
    //layers: true,
    //lazyCompilation: true,
    outputModule: true,
    //syncWebAssembly: true,
    // topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x*)?$/,
        exclude: /node_modules/,
        use: {
          //loader: 'expose-loader',
          options: {
            exposes: ['myNameSpace'],
          },
          loader: 'ts-loader',
          options: {
            configFile: 'config/tsconfig.umd.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
}
