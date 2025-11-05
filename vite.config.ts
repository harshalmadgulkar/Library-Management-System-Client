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
      '@root': root,
      '@app': path.resolve(root, 'app'),
      '@assets': path.resolve(root, 'assets'),
      '@pages': path.resolve(root, 'pages'),
      '@components': path.resolve(root, 'components'),
      '@features': path.resolve(root, 'features'),
      '@utils': path.resolve(root, 'utils'),
      '@hooks': path.resolve(root, 'hooks'),
    }
  }
});
