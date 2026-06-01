# 架构设计 - AI 工具导航网站

## 技术选型

| 层级 | 选型 | 理由 |
|------|------|------|
| 构建工具 | Vite 5 | 零配置、热更新、开箱即用 |
| 前端 | 原生 HTML + CSS + JS | 轻量、无框架依赖、易维护 |
| 数据 | JS 模块导出 | 静态数据，无需 API |
| 部署 | 静态文件托管 | `npm run build` 输出 dist |

## 目录结构

```
website/
├── index.html          # 入口页面
├── package.json        # 依赖与脚本
├── vite.config.js      # Vite 配置
├── src/
│   ├── main.js         # 应用逻辑（渲染、搜索、导航）
│   ├── styles.css      # 全局样式（深色主题）
│   └── data.js         # 工具与分类数据
└── .boss/ai-tool-nav/  # BMAD 产物
```

## 模块职责

- **data.js**：分类定义、工具列表、广告位配置
- **main.js**：DOM 渲染、搜索过滤、分类锚点滚动、广告位注入
- **styles.css**：CSS 变量驱动的深色主题、Grid/Flex 布局

## 广告位设计

| 位置 | ID | 尺寸建议 |
|------|-----|----------|
| 顶部横幅 | `ad-top-banner` | 728×90 |
| 侧边栏 | `ad-sidebar` | 300×250 |
| 分类间插播 | `ad-inline-{n}` | 728×90 |

广告内容通过 `data.js` 中的 `ads` 配置项管理，支持 HTML 片段或占位符。

## 扩展路径

- 后续可接入 CMS 或 JSON 文件热更新
- 可添加暗/亮主题切换
- 可接入 Google AdSense 替换占位广告
