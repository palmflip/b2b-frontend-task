import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    },
  },
  server: {
    proxy: {
      '/search': 'http://localhost:3000',
      '/tickets': 'http://localhost:3000'
    }
  }
})