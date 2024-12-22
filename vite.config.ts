import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 8080 // Use port 8080
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
