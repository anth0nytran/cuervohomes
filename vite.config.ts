import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // react-helmet-async ships a CJS build whose named exports don't resolve
    // cleanly under Node ESM, so bundle it. react-router-dom must stay
    // external: bundling it rewrites its `react-router/dom` import into a
    // default import, which that ESM-only module doesn't provide.
    noExternal: ["react-helmet-async"],
  },
})
