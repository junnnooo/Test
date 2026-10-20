import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // During development, forward /api calls to the Node server.
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
