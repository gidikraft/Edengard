import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";
import { wp } from "./layout";

// import { wp } from "@/constants/layout";

export const palette = {
  background: "#f0f9fc",
  black: "#101818",
  blackFaded: "rgba(0, 0, 0, 0.1)",
  blackTint: "#696977",
  blue: "#3878B8",
  blueBackground: "#00d4ff",
  buttonGreen: "#51AAB1",
  contactColor: "rgba(99, 122, 135, 1)",
  error: "#E25825",
  gradientBlue: "#48A8D4",
  grey: "#C1C7CF",
  lightBorder: "rgba(128, 128, 128, .3)",
  lightgrey: "rgba(0, 0, 0, 0.1)",
  pinBackground:"rgba(60, 129, 188, 0.1)",
  pinColor: "rgba(97, 110, 136, 1)",
  pin_amount: "rgba(0, 0, 0, 0.2)",
  primary: "#D1AE6C",
  primaryFaded: "rgba(60, 129, 188, .1)",
  secondary: "#878681",
  success: "#97E225",
  superlightgrey: "rgba(239, 239, 239, 1)",
  textColor: "#000000",
  textGreen: "#00AA8B",
  textInputBackground: "#EFEFEF",
  textRed: "#FF1313",
  transparent: "transparent",
  white: "#FBFBFB",
};

const theme = createTheme({
  breakpoints: {
    bigscreen: 412,
    phone: 0,
    tablet: 768,
  },
  buttonGradients: {
    primary: [palette.primary, palette.secondary, palette.textGreen],
    secondary: [palette.gradientBlue, palette.success],
    tatiary: [palette.primaryFaded, palette.textRed],
  },
  colors: {
    ...palette,
    blockBg: palette.grey,
    buttonPry: palette.primary,
    mainBackground: palette.white,
    textColor: palette.black,
    textColorTint: palette.blackTint,
  },
  spacing: {
    Ml: wp(60), // mega large
    lg: wp(24), // large
    md: wp(16), // medium
    sl: wp(20), // semi large
    sm: wp(12), // semi medium
    sml: wp(8), // small
    ssm: wp(10), // semi small medium
    xl: wp(32), // extra large
    xs: wp(4), // extra small
    xxl: wp(40), // extra extra large
    xxs: wp(2), // extra extra small
  },
  textVariants: {
    body: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
    boldBody: {
      color: "textColorTint",
      fontFamily: "harmonia-bd",
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 20,
    },
    button: {
      color: "mainBackground",
      fontFamily: "harmonia-sbd",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 22,
    },
    defaults: {},
    header: {
      color: "textColor",
      fontFamily: "harmonia-sbd",
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 36,
    },
    medium12: {
      color: "textColorTint",
    //   fontFamily: "harmonia-rg",
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium14: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium16: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium18: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium20: {
      color: "textColorTint",
      fontFamily: "harmonia-bd",
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 20,
    },
    regular12: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular14: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular16: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular18: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular20: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 20,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular24: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 24,
      fontWeight: "400",
      lineHeight: 20,
    },
    subHeading: {
      color: "textColor",
      fontFamily: "harmonia-sbd",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 21,
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();

export type PaletteType = keyof typeof palette;

export default theme;
