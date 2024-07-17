import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log('Loaded environment variables:', env); // Add this line for debugging

  return {
    plugins: [react(), macrosPlugin()],
    root: './',
    build: {
      outDir: 'dist',
    },
    publicDir: 'src', // Double-check if this should be 'public' instead of 'src'
    server: {
      fs: {
        allow: ['..'],
      },
    },
    define: {
      'process.env': env,
    },
  };
});
