import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 解决 vue-i18n 在开发环境下的警告
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag === 'iconpark-icon',
        },
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Pages({
      extensions: ['vue', 'md'],
      routeStyle: 'nuxt',
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        '@vueuse/head',
        {
          vue: [
            ['defineProps', 'defineProps'],
            ['defineEmits', 'defineEmits'],
            ['defineExpose', 'defineExpose'],
          ],
        },
      ],
      resolvers: [ElementPlusResolver()],
      dts: './src/auto-imports/auto-imports.d.ts',
      dirs: ['./src/composables', './src/stores'],
      eslintrc: {
        enabled: true,
        filepath: './src/auto-imports/.eslintrc-auto-import.json',
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './src/auto-imports/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: 'page-markdown',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: 'solarized-light',
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
  ],
})
