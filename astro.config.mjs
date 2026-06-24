// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ourorigin.in',
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (url.pathname === '/why' || url.pathname === '/why/') {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (url.pathname === '/observations' || url.pathname === '/observations/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (url.pathname === '/contact' || url.pathname === '/contact/') {
          item.changefreq = 'yearly';
          item.priority = 0.6;
        } else {
          // Dynamic product pages
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        return item;
      }
    })
  ]
});
