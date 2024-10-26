import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.resolve(path.dirname(new URL(import.meta.url).pathname));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@css": path.resolve(__dirname, 'src/css'),
      "@fonts": path.resolve(__dirname, 'src/fonts'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@ux": path.resolve(__dirname, 'src/ux'),
    }
  }
})
