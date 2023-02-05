import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-unresolved
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
  plugins: [react(), macrosPlugin()],
});
