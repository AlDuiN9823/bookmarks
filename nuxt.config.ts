// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = 'src/';

export default defineNuxtConfig({
  css: [
    '@/src/assets/stylesheets/main.less'
  ],
  alias: {
    '@database': resolve(__dirname, 'server/db')
  },
  dir: {
    layouts: `${srcDir}layouts`,  
    pages: `${srcDir}pages`,
    modules: `${srcDir}modules`,
    assets: `${srcDir}assets`,
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false }
})