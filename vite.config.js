import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-unresolved
import macrosPlugin from 'vite-plugin-babel-macros';
import { dependencies } from './package.json';

function renderChunks(deps) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [react(), macrosPlugin()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
