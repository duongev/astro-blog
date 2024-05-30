import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
    isr: true,
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
  integrations: [vue({
    jsx: true
  })]
});