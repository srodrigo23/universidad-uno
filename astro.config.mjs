// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
// import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  i18n: {
    locales: ['es', 'pt'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  // adapter: vercel({
  //   webAnalytics: {
  //     enabled: true, // set to false when using @vercel/analytics@1.4.0
  //   },
  // }),
});