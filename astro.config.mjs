import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://suretyresearch.com',
  trailingSlash: 'always',
  integrations: [react()],
});
