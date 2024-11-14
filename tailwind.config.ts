import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(210, 100%, 98%)',
        foreground: 'hsl(210, 100%, 10%)',
        card: {
          DEFAULT: 'hsl(210, 100%, 95%)',
          foreground: 'hsl(210, 100%, 20%)',
        },
        popover: {
          DEFAULT: 'hsl(210, 100%, 90%)',
          foreground: 'hsl(210, 100%, 30%)',
        },
        primary: {
          DEFAULT: 'hsl(220, 90%, 56%)',
          foreground: 'hsl(220, 100%, 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(340, 82%, 52%)',
          foreground: 'hsl(340, 100%, 98%)',
        },
        muted: {
          DEFAULT: 'hsl(210, 20%, 70%)',
          foreground: 'hsl(210, 20%, 20%)',
        },
        accent: {
          DEFAULT: 'hsl(50, 100%, 50%)',
          foreground: 'hsl(50, 100%, 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 82%, 52%)',
          foreground: 'hsl(0, 100%, 98%)',
        },
        border: 'hsl(210, 20%, 80%)',
        input: 'hsl(210, 20%, 90%)',
        ring: 'hsl(220, 90%, 56%)',
        chart: {
          '1': 'hsl(220, 90%, 56%)',
          '2': 'hsl(340, 82%, 52%)',
          '3': 'hsl(50, 100%, 50%)',
          '4': 'hsl(120, 82%, 52%)',
          '5': 'hsl(280, 82%, 52%)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
