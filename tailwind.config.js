/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },
      colors: {
        x: '#B05050',
        y: '#50A068',
        z: '#5070B0',
      },
    },
  },
  plugins: [],
};
