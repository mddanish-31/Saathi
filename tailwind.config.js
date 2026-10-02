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
        canvas: 'var(--bg-base)',
        background: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        'text-primary': 'var(--text-primary)',
        foreground: 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        muted: 'var(--text-muted)',
        'border-hairline': 'var(--border)',
        border: 'var(--border)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          soft: 'var(--accent-soft)',
          foreground: 'var(--accent-foreground)',
        },
        // Theme-aware brand palette mapped to CSS variables
        brand: {
          nude: 'var(--saathi-nude)',
          maroon: 'var(--saathi-maroon)',
          taupe: 'var(--saathi-soft-taupe)',
          plum: 'var(--saathi-deep-plum)',
        },
        // Status colors
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        signature: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        heading: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        body: ['var(--font-general-sans)', 'General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['var(--font-general-sans)', 'General Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
};
