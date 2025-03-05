import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tailwindcssAnimated from 'tailwindcss-animated';

export default defineConfig({
    plugins: [react(), tailwindcss(), tailwindcssAnimated()],
});
