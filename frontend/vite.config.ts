import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true,
        // secure: false, // uncomment if backend is not on HTTPS and issues arise
      }
    }
  }
})
