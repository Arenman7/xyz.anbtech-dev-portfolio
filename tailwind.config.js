/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, hsla(228, 100%, 4%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(240, 100%, 5%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(216, 100%, 4%, 1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(264, 100%, 5%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(204, 100%, 4%, 1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(252, 100%, 5%, 1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(222, 100%, 4%, 1) 0px, transparent 50%)',
      },
      fontFamily: {
        sans: ['Calibre', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
