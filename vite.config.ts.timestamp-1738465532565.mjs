// vite.config.ts
import { defineConfig } from "file:///Users/nazarbabii/Documents/Projects/baseball-fans/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nazarbabii/Documents/Projects/baseball-fans/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import svgr from "file:///Users/nazarbabii/Documents/Projects/baseball-fans/node_modules/@svgr/rollup/dist/index.js";
var __vite_injected_original_dirname = "/Users/nazarbabii/Documents/Projects/baseball-fans";
var vite_config_default = defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: "0.0.0.0",
    // Listen on all interfaces
    port: 8080,
    // Use port 8080,
    cors: false,
    proxy: {
      "/v1": {
        target: "http://statsapi.mlb.com/api/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path2) => path2.replace(/^\/v1/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    "process.env": process.env
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF6YXJiYWJpaS9Eb2N1bWVudHMvUHJvamVjdHMvYmFzZWJhbGwtZmFuc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25hemFyYmFiaWkvRG9jdW1lbnRzL1Byb2plY3RzL2Jhc2ViYWxsLWZhbnMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25hemFyYmFiaWkvRG9jdW1lbnRzL1Byb2plY3RzL2Jhc2ViYWxsLWZhbnMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLCAvLyBMaXN0ZW4gb24gYWxsIGludGVyZmFjZXNcbiAgICBwb3J0OiA4MDgwLCAvLyBVc2UgcG9ydCA4MDgwLFxuICAgIGNvcnM6IGZhbHNlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL3YxJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vc3RhdHNhcGkubWxiLmNvbS9hcGkvdjEnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC92MS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgfVxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiBwcm9jZXNzLmVudlxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsU0FBUyxvQkFBb0I7QUFDclcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFBQSxFQUN6QixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsU0FBUyxFQUFFO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxRQUFRO0FBQUEsRUFDekI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
