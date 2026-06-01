# 部署报告 - AI 工具导航网站

## 项目位置

`c:\Users\PC\Desktop\网站\website\`

## 运行方式

### 前置条件

安装 [Node.js 18+](https://nodejs.org/)（含 npm）

### 本地开发

```bash
cd website
npm install
npm run dev
```

浏览器自动打开 `http://localhost:5173`

### 生产构建

```bash
npm run build
npm run preview
```

构建产物在 `dist/` 目录，可部署到任意静态托管（Vercel、Netlify、GitHub Pages、Nginx 等）。

## 广告位配置

编辑 `src/data.js` 中的 `ads` 对象，将 `html` 字段替换为真实广告代码：

```js
export const ads = {
  topBanner: {
    html: '<script>...</script>',  // Google AdSense 等
  },
  // ...
};
```

## 工具数据维护

编辑 `src/data.js` 中的 `categories` 数组，按分类增删工具条目即可。

## 部署建议

| 平台 | 命令/方式 |
|------|-----------|
| Vercel | 导入 Git 仓库，框架选 Vite |
| Netlify | `npm run build`，发布目录 `dist` |
| GitHub Pages | 使用 `gh-pages` 或 Actions 部署 dist |

## 状态

- 代码已就绪，待本地安装 Node.js 后执行 `npm install && npm run dev` 即可运行
