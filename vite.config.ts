import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        '.env': process.env,
        'process.env': process.env,
    },
    server: {
        host: true,
        port: 8080, // Задайте тут бажаний вами порт
    },
    base: './',
});
