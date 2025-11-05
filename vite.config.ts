import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path, { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(root, 'assets'),
      '@pages': path.resolve(root, 'pages'),
      '@store': path.resolve(root, 'store'),
      '@root': root,
    }
  }
});
