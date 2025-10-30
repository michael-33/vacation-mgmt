import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// vite config for local dev; proxies api calls to backend
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
