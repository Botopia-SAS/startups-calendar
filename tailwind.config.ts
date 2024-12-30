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
        extra: "0.12em", // Espaciado personalizado
        wider: "0.2em",  // Más espaciado, por ejemplo
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
      },
    },
  },
  plugins: [],
} satisfies Config;
