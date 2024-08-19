import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "309px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
      colors: {
        "txt-color": "#000000",
        "custom-gray": "#838383",
        "background-primary": "#FFFFFF",
        "background-secondary": "#F3F3F3",
        "strokes-primary": "#d4d4d4",
        "strokes-secondary": "#e6e6e6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "1.25": "0.3125rem",
      },
      spacing: {
        "0.75": "0.1875rem",
        "1.25": "0.3125rem",
        "2.5": "0.625rem",
        "3.125": "0.78125rem",
        "3.75": "0.9375rem",
        "5.75": "1.4375rem",
        "6.25": "1.5625rem",
        "7.5": "1.875rem",
        "8.25": "2.0625rem",
        "13.75": "3.4375rem",
        "15": "3.75rem",
        "16.5": "4.125rem",
        "21.25": "5.3125rem",
        "25": "6.25rem",
        "37.5": "9.375rem",
      },
      width: {
        "12.5": "3.125rem",
        "25": "6.25rem",
        "w-minus-avatar": "calc(100% - 55px)",
      },
      maxWidth: {
        "62.5": "15.625rem",
        "100": "25rem",
        "150": "37.5rem",
      },
      height: {
        "12.5": "3.125rem",
        "25": "6.25rem",
        "38.5": "9.625rem",
        "50": "12.5rem",
        "71": "17.75rem",
        "100": "25rem",
        "screen-minus-header": "calc(100vh - 82px - 79px)",
        "screen-minus-header-footer": "calc(100vh - 82px - 72px)",
      },
      minHeight: {
        "screen-minus-header": "calc(100vh - 82px )",
        "150": "37.5rem",
      },
      fontSize: {
        title: "30px",
        subtitle: "18px",
        paragraph: "16px",
        paragraphMini: "12px",
        btnText: "16px",
      },
      lineHeight: {
        title: "1.4",
        subtitle: "1.4",
        paragraph: "1.6",
        paragraphMini: "1.6",
        btnText: "1.6",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".subtitle": {
          fontSize: theme("fontSize.subtitle"),
          lineHeight: theme("lineHeight.subtitle"),
        },
        ".title": {
          fontSize: theme("fontSize.title"),
          lineHeight: theme("lineHeight.title"),
        },
        ".paragraph": {
          fontSize: theme("fontSize.paragraph"),
          lineHeight: theme("lineHeight.paragraph"),
        },
        ".paragraphMini": {
          fontSize: theme("fontSize.paragraphMini"),
          lineHeight: theme("lineHeight.paragraphMini"),
        },
        ".btnText": {
          fontSize: theme("fontSize.btnText"),
          lineHeight: theme("lineHeight.btnText"),
        },
      });
    }),
  ],
};
export default config;
