// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
// import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.uno.edu.bo', // real site name
  integrations: [
    react(), 
    sitemap(
      { 
        i18n: { 
          defaultLocale: 'es', 
          locales: { 
            es: 'es-BO', 
            pt: 'pt-BR' 
          } 
        } 
      }
    )
  ],

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