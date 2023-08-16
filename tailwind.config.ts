import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'deep-charcoal': '#1a1a1a',
                'midnight-blue': '#002b5c',
                'lustrous-gold': '#d4af37',
            },
        },
    },
    plugins: [],
}
export default config
