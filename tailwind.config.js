/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
  ],
  theme: {
    extend: {
      animation: {
        'correct-pop': 'correct-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'incorrect-shake': 'incorrect-shake 0.4s ease-in-out',
        'confetti-burst': 'confetti-burst 0.6s ease-out forwards',
      },
      keyframes: {
        'correct-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'incorrect-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-8px)' },
          '80%': { transform: 'translateX(8px)' },
        },
        'confetti-burst': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(2) translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}