/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-alt)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        'primary-glow': 'var(--color-primary-glow)',
        'accent-green': 'var(--success)',
        'accent-yellow': 'var(--warning)',
        'accent-red': 'var(--error)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        heading: ["'Space Grotesk'", 'sans-serif'],
        display: ["'DM Serif Display'", 'serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
