import { defineConfig } from 'umi';
import routes from './routes';
import themes from './themes';

const SYSTEM_NAME = 'Korn';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  layout: false,
  favicon: '/favicon.svg',
  hash: true,
  define: {
    SYSTEM_NAME,
  },
  theme: themes,
  title: SYSTEM_NAME,
  metas: [
    {
      name: 'keywords',
      content: 'korn',
    },
    {
      name: 'description',
      content: `${SYSTEM_NAME}`,
    },
  ],
  chainWebpack: function (memo, {}) {
    memo.plugins.delete('commands/version/version');
    memo.plugins.delete('version/version');
  },
  extraPostCSSPlugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
  ],
});
