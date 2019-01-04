const path = require('path');
const fs = require('fs');

module.exports = {
  entry: fs.readdirSync(path.join(__dirname, 'src'))
    .filter(filename => /\.ts$/.test(filename))
    .map((filename) => {
      const entry = {};
      entry[filename.replace('.ts', '')] = path.join(__dirname, 'src/', filename);
      return entry;
    })
    .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),
  output: {
    path: path.join(__dirname, ''),
    library: '[name]',
    libraryTarget: 'commonjs2',
    filename: '[name].js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /\.ts$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
