import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Support for Vercel deployment environment
  build: {
    // Output to the .ladle/dist directory for Vercel
    outDir: process.env.VERCEL ? '.ladle/dist' : undefined,
    // Ensure source maps for better debugging
    sourcemap: true,
    // Optimizations for production build
    minify: 'terser',
    // CSS handling
    cssCodeSplit: true
  },
  // Let Ladle handle Tailwind CSS through the global import in the stories
  // This avoids issues with ESM compatibility
});


