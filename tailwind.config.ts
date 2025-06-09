import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  		},
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  				keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' },
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' },
			},
			flip: {
				'0%': { 
					transform: 'perspective(600px) rotateX(0deg)',
					transformOrigin: 'center bottom',
				},
				'100%': { 
					transform: 'perspective(600px) rotateX(-90deg)',
					transformOrigin: 'center bottom',
				},
			},
			'flip-in': {
				'0%': { 
					transform: 'perspective(400px) rotateX(-180deg)',
					opacity: '0',
				},
				'100%': { 
					transform: 'perspective(400px) rotateX(0deg)',
					opacity: '1',
				},
			},
			'flip-top-down': {
				'0%': { transform: 'perspective(600px) rotateX(0deg)' },
				'100%': { transform: 'perspective(600px) rotateX(-90deg)' }
			},
			'flip-bottom-up': {
				'0%': { transform: 'perspective(600px) rotateX(90deg)' },
				'100%': { transform: 'perspective(600px) rotateX(0deg)' }
			},
			shimmer: {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(100%)' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			flip: 'flip 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			'flip-in': 'flip-in 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) 0.3s both',
			'flip-top-down': 'flip-top-down 0.6s ease-in-out',
			'flip-bottom-up': 'flip-bottom-up 0.6s ease-in-out',
			shimmer: 'shimmer 2s infinite'
		},
  				fontFamily: {
			comic: ['Comic Sans MS', 'cursive'],
		},
		perspective: {
			'1000': '1000px',
		},
		rotate: {
			'x-90': 'rotateX(90deg)',
			'x-0': 'rotateX(0deg)',
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
