import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 8080, // Use port 8080,
    cors: false,
    proxy: {
      '/v1': {
        target: 'http://statsapi.mlb.com/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, '')
      },
      '/v2': {
        target: 'https://baseball-fans-445201-288548494819.us-central1.run.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v2/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
