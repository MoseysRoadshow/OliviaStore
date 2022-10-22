/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            pacifico: ['Pacifico', 'cursive'],
        },
        extend: {
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                slideOut: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'modal-open': 'slideIn 500ms both 200ms',
                'modal-close': 'slideOut 500ms both',
                'fade-in': 'fadeIn 500ms both',
                'fade-in-modal': 'fadeIn 600ms both 450ms',
            },
            gridTemplateColumns: {
                300: 'repeat(auto-fit, minmax(300px, 1fr))',
            },
        },
    },
    plugins: [],
};
