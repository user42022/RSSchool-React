import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src'],
      exclude: ['src/types', 'src/vite-env.d.ts', 'src/tests/mocks'],
    },
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
