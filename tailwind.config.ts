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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "1.25": "0.3125rem",
      },
      padding: {
        "0.75": "0.1875",
        "3.7": "0.938rem",
        "5.75": "1.4375rem",
        "8.25": "2.0625rem",
      },
      width: {
        "12.5": "3.125rem",
      },
      height: {
        "12.5": "3.125rem",
      },
      minHeight: {
        "screen-minus-header": "calc(100vh - 82px)",
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
