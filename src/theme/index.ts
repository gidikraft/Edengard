import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";
import { wp } from "./layout";

// import { wp } from "@/constants/layout";

export const palette = {
  background: "#f0f9fc",
  black: "#101818",
  // blackFaded: "rgba(0, 0, 0, 0.1)",
  blackTint: "#696977",
  blue: "#3878B8",
  blueBackground: "#00d4ff",
  blueHighlight: "#EAF2FF",
  border: "#D0D0D0",
  buttonGreen: "#51AAB1",
  contactColor: "#0601B4",
  error: "#e22525",
  gradientBlue: "#48A8D4",
  grey: "#C1C7CF",
  lightBorder: "rgba(128, 128, 128, .3)",
  lightgrey: "rgba(0, 0, 0, 0.1)",
  // pinBackground:"rgba(60, 129, 188, 0.1)",
  // pinColor: "rgba(97, 110, 136, 1)",
  // pin_amount: "rgba(0, 0, 0, 0.2)",
  primary: "#3A595D",
  primaryFaded: "rgba(60, 129, 188, .1)",
  redBackground: '#f2eded',
  secondary: "#878681",
  secondaryText: "#ABABAB",
  success: "#97E225",
  superlightgrey: "rgba(239, 239, 239, 1)",
  textBlue: "#006FFD",
  textColor: "#262626",
  textGreen: "#00AA8B",
  textInputBackground: "#EFEFEF",
  textRed: "#d68383",
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
    sms: wp(6), // semi small
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
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
    boldBody: {
      color: "textColorTint",
      fontFamily: "BlackMango-Bold",
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 20,
    },
    button: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 22,
    },
    defaults: {},
    header: {
      color: "textColor",
      fontFamily: "BlackMango-ExtraBold",
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 36,
    },
    bold14: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      fontWeight: "800",
      lineHeight: 16.94,
    },
    bold16: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 20,
    },
    bold18: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 24,
    },
    bold20: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      fontWeight: "700",
      lineHeight: 30,
    },
    bold22: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 22,
      fontWeight: "700",
      lineHeight: 30,
    },
    bold24: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 32,
    },
    light12: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 12,
      fontWeight: "300",
      lineHeight: 20,
    },
    light14: {
      color: "textColor",
      fontFamily: "Poppins-Light",
      fontSize: 14,
      fontWeight: "300",
      lineHeight: 20,
    },
    light16: {
      color: "textColor",
      fontFamily: "Poppins-Light",
      fontSize: 16,
      fontWeight: "300",
      lineHeight: 20,
    },
    medium10: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 10,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium12: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium14: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium16: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium18: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 20,
    },
    medium20: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 24,
    },
    medium24: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 28,
    },
    regular10: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 10,
      fontWeight: "400",
      lineHeight: 14,
    },
    regular12: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 16,
    },
    regular14: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular16: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular18: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular20: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 20,
      fontWeight: "400",
      lineHeight: 20,
    },
    regular24: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 24,
      fontWeight: "400",
      lineHeight: 28,
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
