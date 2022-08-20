/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            animation: {
                'modal-open': 'slideIn 500ms both',
            },
            gridTemplateColumns: {
                300: 'repeat(auto-fit, minmax(300px, 1fr))',
            },
        },
    },
    plugins: [],
};
