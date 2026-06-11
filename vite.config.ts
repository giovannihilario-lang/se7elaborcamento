import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // ← changed

export default defineConfig({
  plugins: [react()],
})