// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fluxghg.com',
  trailingSlash: 'ignore',
  build: {
    // Emit `about/index.html` style paths so S3 + CloudFront serve clean URLs.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', pt: 'pt-BR' },
      },
    }),
  ],
  vite: {
    // Astro bundles its own Vite copy, so the plugin's `Plugin` type comes from
    // a different vite install than the config's. Runtime is fine; the cast
    // just keeps `astro check` quiet.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
