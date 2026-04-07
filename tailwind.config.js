/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx",
        "./constants.tsx"
    ],
    theme: {
        extend: {
            colors: {
                'brand': '#3A86FF', // Primary Brand Blue
                'brand-dark': '#2563EB', // Secondary/Hover Blue
                'brand-light': '#60A5FA', // Accents
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)', // For cards/inputs
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-muted': 'var(--text-muted)',
                'text-inverted': '#FFFFFF',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'spin-slow': 'spin 3s linear infinite',
            },
            boxShadow: {
                'premium': '0 10px 40px -10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)',
                'premium-hover': '0 20px 60px -10px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.02)',
                'glow': '0 0 20px rgba(58, 134, 255, 0.4)',
                'glow-strong': '0 0 30px rgba(58, 134, 255, 0.6)',
                'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
