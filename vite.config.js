import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

const base = process.env.NODE_ENV === 'production' 
  ? '/vaultic-crypto-engine-demo/'
  : '';

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  optimizeDeps: {
    exclude: ['vaultic-crypto-engine']
  },
  base: base
});