import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.js',
    css: true,
    exclude: [
      'e2e/**',
      'node_modules/**',
      'dist/**',
      'playwright-report/**',
      '.git/**'
    ],
  },
})
