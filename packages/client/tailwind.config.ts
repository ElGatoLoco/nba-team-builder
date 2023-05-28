import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      animation: {
        'lds-ripple': 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      colors: {
        primary: colors.stone,
        secondary: colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config;
