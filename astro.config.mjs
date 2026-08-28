// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ourorigin.in',
  output: 'static',

  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          item.changefreq = /** @type {any} */ ('weekly');
          item.priority = 1.0;
        } else if (url.pathname === '/why' || url.pathname === '/why/') {
          item.changefreq = /** @type {any} */ ('monthly');
          item.priority = 0.8;
        } else if (url.pathname === '/observations' || url.pathname === '/observations/') {
          item.changefreq = /** @type {any} */ ('weekly');
          item.priority = 0.9;
        } else if (url.pathname === '/contact' || url.pathname === '/contact/') {
          item.changefreq = /** @type {any} */ ('yearly');
          item.priority = 0.6;
        } else {
          // Dynamic product pages
          item.changefreq = /** @type {any} */ ('weekly');
          item.priority = 0.8;
        }
        return item;
      }
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});