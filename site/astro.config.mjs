import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://shuishui313.github.io',
  base: '/knowledge-base',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
