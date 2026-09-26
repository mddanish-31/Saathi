/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic role tokens (controlled by CSS variables)
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'border-hairline': 'var(--border)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          soft: 'var(--accent-soft)',
        },
        // Client brand palette (exact hex values)
        brand: {
          nude: '#D2B3A7',
          maroon: '#5B3A4A',
          taupe: '#CBBEB1',
          plum: '#4E354F',
        },
        // Status colors
        status: {
          success: '#4A7A5E',
          warning: '#B08D2C',
          error: '#B23A3A',
        },
      },
      fontFamily: {
        signature: ['var(--font-fraunces)', 'serif'],
        heading: ['General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
};
