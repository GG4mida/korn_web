import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_BASE: 'http://127.0.0.1:7070',
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7070',
      changeOrigin: true,
    },
  },
});
