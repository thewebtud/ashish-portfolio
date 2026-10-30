/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const notFoundTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=%BASE%" />
    <title>Ashish Kumar | Lead Frontend Developer</title>
    <link rel="canonical" href="%BASE%" />
  </head>
  <body>
    <p>Page not found. <a href="%BASE%">Go to Ashish Kumar's portfolio</a>.</p>
  </body>
</html>
`

// Emits 404.html pointing at the deploy base (GitHub Pages serves it for unknown paths).
function notFoundPage(base: string): Plugin {
  return {
    name: 'not-found-page',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: notFoundTemplate.replaceAll('%BASE%', base),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // GitHub Pages serves from /<repo>/, so CI sets VITE_BASE. Vercel and local use "/".
  const base = loadEnv(mode, '.', 'VITE_').VITE_BASE || '/'

  return {
    base,
    plugins: [react(), notFoundPage(base)],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: { include: [/tokens\.css/] },
    },
  }
})
