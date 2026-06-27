/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',

      surface: '#0D0D0F',
      raised: '#1C1C21',
      line: '#3A3A42',
      muted: '#8A8A96',
      copy: '#F0F0F4',

      orange: {
        DEFAULT: '#F97316',
        dim: '#C25A0E',
      },

      blue: {
        DEFAULT: '#0EA5E9',
        dim: '#0369A1',
      },
    },

    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        'phi-xs': ['10px', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        'phi-sm': ['13px', { lineHeight: '1.5' }],
        'phi-base': ['16px', { lineHeight: '1.65' }],
        'phi-md': ['26px', { lineHeight: '1.3' }],
        'phi-lg': ['42px', { lineHeight: '1.15' }],
        'phi-xl': ['68px', { lineHeight: '1.05' }],
      },

      spacing: {
        'fib-1': '4px',
        'fib-2': '8px',
        'fib-3': '12px',
        'fib-4': '20px',
        'fib-5': '32px',
        'fib-6': '52px',
        'fib-7': '84px',
        'fib-8': '136px',
      },

      maxWidth: {
        content: '1100px',
      },
    },
  },

  plugins: [],
};