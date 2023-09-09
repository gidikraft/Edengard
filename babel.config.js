module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".ts",
          ".tsx",
          ".json",
          ".svg",
        ],
        alias: {
          "@/assets": "./src/assets",
          "@/components": "./src/components",
          "@/constants": "./src/constants",
          "@/hooks": "./src/hooks",
          "@/navigation": "./src/navigation",
          "@/screens": "./src/screens",
          "@/store": "./src/store",
          "@/theme": "./src/theme",
          "@/utils": "./src/utils",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
