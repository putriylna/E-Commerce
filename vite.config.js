import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    proxy: {
      '/api': { // setiap request ke /api akan diteruskan ke fakestoreapi
        target: 'https://fakestoreapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // hapus /api saat request ke target
      },
    },
  },
})