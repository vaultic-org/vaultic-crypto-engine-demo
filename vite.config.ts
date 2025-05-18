import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// On Netlify, we don't need a base path
const base = '';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['vaultic-crypto-engine']
  },
  base: base
});