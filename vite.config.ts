import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@css": path.resolve(__dirname, 'src/css'),
      "@fonts": path.resolve(__dirname, 'src/fonts'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@public": path.resolve(__dirname, 'public') // Alias for the public folder
    }
  }
})
