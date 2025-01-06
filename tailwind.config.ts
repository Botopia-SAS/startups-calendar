import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      letterSpacing: {
        extra: "0.10em", // Espaciado personalizado
        wider: "0.15em",  // Más espaciado, por ejemplo
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
      },
      fontFamily: {
        roboto: ['"Roboto Flex"', 'sans-serif'], // Agregamos la fuente Roboto Flex
      },
    },
  },
  plugins: [],
} satisfies Config;
