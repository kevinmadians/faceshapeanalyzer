import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our app
				lavender: '#E5DEFF',
				mint: '#D3FFED',
				peach: '#FFE4D6',
				softBlue: '#D3E4FD',
				softPink: '#FFDEE2',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.95)', opacity: '0.2' },
					'50%': { opacity: '0.5' },
					'100%': { transform: 'scale(1.2)', opacity: '0' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'scan-down': {
					'0%': { transform: 'translateY(0%)', opacity: '0.7' },
					'5%': { opacity: '0.8' },
					'30%': { opacity: '0.9' },
					'50%': { transform: 'translateY(50%)' },
					'70%': { opacity: '0.9' },
					'95%': { opacity: '0.8' },
					'100%': { transform: 'translateY(100%)', opacity: '0.7' }
				},
				'scan-horizontal': {
					'0%': { transform: 'translateX(-10%)', opacity: '0.7', width: '60%' },
					'25%': { opacity: '0.9', width: '50%' },
					'50%': { transform: 'translateX(60%)', opacity: '1', width: '70%' },
					'75%': { opacity: '0.9', width: '50%' },
					'100%': { transform: 'translateX(-10%)', opacity: '0.7', width: '60%' }
				},
				'grid-pulse': {
					'0%': { opacity: '0.3', backgroundSize: '40px 40px' },
					'50%': { opacity: '0.5', backgroundSize: '45px 45px' },
					'100%': { opacity: '0.3', backgroundSize: '40px 40px' }
				},
				'glow-pulse': {
					'0%': { boxShadow: '0 0 5px 2px rgba(124, 58, 237, 0.3)' },
					'50%': { boxShadow: '0 0 15px 5px rgba(124, 58, 237, 0.6)' },
					'100%': { boxShadow: '0 0 5px 2px rgba(124, 58, 237, 0.3)' }
				},
				'fade-pulse': {
					'0%': { opacity: '0.5' },
					'50%': { opacity: '0.8' },
					'100%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 3.5s linear infinite',
				'scan-down': 'scan-down 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'scan-horizontal': 'scan-horizontal 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
				'fade-pulse': 'fade-pulse 1.8s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
