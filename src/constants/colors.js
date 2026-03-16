export const colorList = {
  transparent: "rgba(255, 255, 255, 0)",
  /* Brand */
  primary: "#D8A96D",
  primaryText: "#1A1A1A",

  /* Feedback */
  success: "#34C759",
  successBackground: "#1F8A4C",
  critical: "#FF3B30",

  /* Links */
  link: "#4EA1FF",

  /* WhatsApp */
  whatsappActive: "#34C759",
  toggleInactive: "#767577",

  /* Light theme */
  lightBackgroundPrimary: "#FFFFFF",
  lightBackgroundSecondary: "#746f6fff",
  lightTextPrimary: "#111111",
  lightTextSecondary: "#6B6B6B",
  lightBorder: "#a6a0a0ff",
  lightOtpBorder: "#D1D1D6",
  lightDivider: "#E5E5EA",

  /* Dark theme */
  darkBackgroundPrimary: "#0B0B0F",
  darkBackgroundSecondary: "#494948ff",
  darkTextPrimary: "#FFFFFF",
  darkTextSecondary: "#A1A1A1",
  darkBorder: "#3A3A3C",
  darkOtpBorder: "#4A4A4C",
  darkDivider: "#2C2C2E",
};


export const COLORS = {
  transparent: colorList.transparent,
  primary: colorList.primary,
  primaryTint: colorList.primary,
  critical: colorList.critical,
  success: colorList.success,
  link: colorList.link,

  button: {
    primary: colorList.primary,
    text: colorList.primaryText,
  },

  text: {
    light: colorList.lightTextPrimary,
    dark: colorList.darkTextPrimary,
  },

  secondaryText: {
    light: colorList.lightTextSecondary,
    dark: colorList.darkTextSecondary,
  },

  background: {
    light: colorList.lightBackgroundPrimary,
    dark: colorList.darkBackgroundPrimary,
  },

  secondaryBackground: {
    light: colorList.lightBackgroundSecondary,
    dark: colorList.darkBackgroundSecondary,
  },

  border: {
    light: colorList.lightBorder,
    dark: colorList.darkBorder,
  },

  otpBorder: {
    light: colorList.lightOtpBorder,
    dark: colorList.darkOtpBorder,
  },

  divider: {
    light: colorList.lightDivider,
    dark: colorList.darkDivider,
  },

  toggle: {
    active: colorList.whatsappActive,
    inactive: colorList.toggleInactive,
  },
};