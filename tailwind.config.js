/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                jhenghei: ["Microsoft JhengHei", "Heiti TC", "Noto Sans TC", "sans-serif"],
            },
            animation: {
                'fly-in-from-right': 'flyInFromRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            },
            keyframes: {
                flyInFromRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(30vw, -30vh) rotate(45deg) scale(0.5)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0, 0) rotate(0deg) scale(1)',
                    },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
