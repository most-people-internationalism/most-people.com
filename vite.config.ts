import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Pages({ extensions: ['vue', 'md'] }),

    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: 'mp-markdown',
      // headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: 'github-light',
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
