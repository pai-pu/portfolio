import { defineConfig, Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// Stub for platform-only virtual modules when building locally
function stubVirtualModules(): Plugin {
  return {
    name: 'stub-virtual-modules',
    resolveId(id) {
      if (id === 'virtual:capabilities') return id
      return null
    },
    load(id) {
      if (id === 'virtual:capabilities') return 'export default {}'
      return null
    },
  }
}

export default defineConfig({
  // GitHub Pages 项目站部署在 https://<用户名>.github.io/<仓库名>/ 下，
  // 必须把 base 设为 '/<仓库名>/'。
  // - 若你的仓库名不是 portfolio，请改成实际仓库名（结尾必须带斜杠）；
  // - 若使用 <用户名>.github.io 个人主页仓库，则改为 '/'。
  base: '/portfolio/',
  plugins: [tailwindcss(), stubVirtualModules()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
