import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

export default defineConfig({
    build: {
        manifest: true, 
        chunkSizeWarningLimit: 2000, 
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        cors: {
            origin: '*', // Allow all origins for development
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        },
    },
});