import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@tycoon/core-simulation': path.resolve(__dirname, '../../packages/core-simulation/src'),
      '@tycoon/network-client': path.resolve(__dirname, '../../packages/network-client/src'),
      '@tycoon/platform-bridge': path.resolve(__dirname, '../../packages/platform-bridge/src')
    }
  },
  server: {
    port: 5173,
    host: true
  }
});