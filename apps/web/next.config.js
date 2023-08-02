const packageJSON = require('./package.json');
const path = require('node:path');

const transpilePackages = Object.keys(packageJSON.dependencies).filter((it) => it.includes('@package/'));

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = getConfig({
  /**
   * Dynamic configuration available for the browser and server.
   * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
   * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
   */
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  reactStrictMode: true,
  output: 'standalone',
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    /* Fixing file tracking in monorepo setup. Required for CMD node apps/web/server.js to work properly
     * @see https://nextjs.org/docs/advanced-features/output-file-tracing#caveats */
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  transpilePackages,
});
