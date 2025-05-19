import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
const base = '';
export default defineConfig({
    plugins: [
        react(),
        wasm(),
        topLevelAwait(),
        TanStackRouterVite(),
        process.env.ANALYZE && visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
        }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        exclude: ['@vaultic/crypto-engine']
    },
    build: {
        cssCodeSplit: false,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['@tanstack/react-router'],
                    ui: ['framer-motion', 'lucide-react'],
                }
            }
        }
    },
    base: base,
    server: {
        headers: {
            'Link': [
                '</fonts/inter.woff2>; rel=preload; as=font; crossorigin',
                '</vaultic-logo.svg>; rel=preload; as=image'
            ]
        }
    }
});
