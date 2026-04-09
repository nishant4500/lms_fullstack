import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/backend': {
        target: 'https://lmsbackend-gbcugef8cug0abh6.centralindia-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
  },
})
