const swcDefaultConfig =
  require("@nestjs/cli/lib/compiler/defaults/swc-defaults").swcDefaultsFactory()
    .swcOptions;

module.exports = {
  node: {
    // required for __dirname to properly resolve
    // Also required for `bull` to work, see https://github.com/OptimalBits/bull/issues/811
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: (_) =>
          /node_modules/.test(_) && !/node_modules\/(@package)/.test(_),
        use: {
          loader: "swc-loader",
          options: swcDefaultConfig,
        },
      },
    ],
  },
};
