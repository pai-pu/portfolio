# SUN YUE — 视觉设计师个人作品集

基于 React 19 + Vite 8 + TypeScript + Tailwind CSS 4 构建的单页作品集网站。

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion（动效）
- GSAP（滚动动画）
- React Router DOM 7
- shadcn/ui 组件库
- Lucide Icons

## 项目结构

```
src/
├── components/       # 共享组件（导航、UI组件等）
├── pages/            # 页面
│   └── HomePage/     # 首页（单页锚点式）
│       └── sections/ # 各区块（Hero / About / Works / Contact）
├── data/             # 静态数据（个人信息、作品、经历等）
├── lib/              # 工具函数
├── hooks/            # 自定义hooks
├── app.tsx           # 路由配置
├── main.tsx          # 入口文件
└── index.css         # 全局样式
```

## 说明

这是从妙搭平台导出的纯前端项目，已移除平台相关依赖，可独立在本地运行和部署。
