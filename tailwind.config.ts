import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
