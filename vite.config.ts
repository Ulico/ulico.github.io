import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Set base to root for user/organization GitHub Pages
  plugins: [react()],
})
