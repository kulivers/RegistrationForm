import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * Vite Configuration
 * Modern build tool configuration for the React TypeScript application
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset/0cf28a1525f0ade04d74fc9d8ac5a6919c5d7f2e.png': path.resolve(
        __dirname,
        './src/assets/0cf28a1525f0ade04d74fc9d8ac5a6919c5d7f2e.png'
      ),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-redux'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});