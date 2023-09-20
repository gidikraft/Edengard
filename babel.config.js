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
          "@/api/": "./src/api",
          "@/assets": "./src/assets",
          "@/components/": "./src/components/",
          "@/config/": "./src/config/",
          "@/constants": "./src/constants",
          "@/hooks": "./src/hooks",
          "@/navigation": "./src/navigation",
          "@/screens": "./src/screens",
          "@/services": "./src/services",
          "@/store": "./src/store",
          "@/theme": "./src/theme",
          "@/types/": "./src/types/",
          "@/utils/": "./src/utils/",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
