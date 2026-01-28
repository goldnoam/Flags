
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
  ],
  theme: {
    extend: {
      animation: {
        'correct-pop': 'correct-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'incorrect-shake': 'incorrect-shake 0.4s ease-in-out',
        'confetti-burst': 'confetti-burst 0.8s ease-out forwards',
        'star-burst': 'star-burst 0.6s ease-out forwards',
      },
      keyframes: {
        'correct-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'incorrect-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(10px)' },
        },
        'confetti-burst': {
          '0%': { transform: 'scale(0) translateY(0)', opacity: '1' },
          '100%': { transform: 'scale(1.5) translateY(-40px)', opacity: '0' },
        },
        'star-burst': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(2.5) rotate(45deg)', opacity: '0' },
        }
      },
    },
  },
  plugins: [],
}
