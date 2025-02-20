module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    test: {
      presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "react-native-reanimated/plugin"
      ]
    },
  },
};
