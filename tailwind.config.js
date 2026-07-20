/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "#070B14",
        surface: "#0D1220",
        panel: "#131A2B",
        elevated: "#1A2338",
        line: "#1E2740",
        "line-strong": "#2C3857",
        fg: "#E6EBF5",
        "fg-muted": "#8B9AB8",
        "fg-subtle": "#5C6B87",
        accent: "#2DE2C5",
        "accent-dim": "#12A98F",
        "accent-wash": "#0F2A2B",
        info: "#60A5FA",
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F5556D",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.8)",
        pop: "0 24px 60px -20px rgba(0,0,0,0.85)",
        "accent-glow":
          "0 0 0 1px rgba(45,226,197,0.35), 0 8px 30px -12px rgba(45,226,197,0.45)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up 420ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 300ms ease-out both",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: { DEFAULT: "1740px" },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
