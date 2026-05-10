import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { navy: { 950: "#050816", 900: "#0a1020", 850: "#111a2e", 800: "#152039" }, primary: "#2563eb" } } },
  plugins: []
};
export default config;
