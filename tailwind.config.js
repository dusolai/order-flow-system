/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ofs: {
          bg: '#0a0a0b',
          panel: '#121214',
          card: '#17171a',
          border: '#26262b',
          text: '#f5f5f7',
          mute: '#8a8a92',
          accent: '#ff6a00',
          accent2: '#ff2d87',
          good: '#22c55e',
          warn: '#facc15',
          bad: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'ofs-gradient': 'linear-gradient(135deg, #ff6a00 0%, #ff2d87 100%)',
      },
    },
  },
  plugins: [],
}
