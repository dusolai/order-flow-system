import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works both on GitHub Pages (served at
  // /order-flow-system/) and on Cloudflare Pages (served at root).
  base: './',
})
