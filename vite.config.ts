import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
     host: '0.0.0.0', // Listen on all interfaces
     port: 8080,     // Use port 8080
  },
})
