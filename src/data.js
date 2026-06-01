export const siteConfig = {
  name: 'AI Tools Hub',
  tagline: '发现最好用的 AI 工具',
  footer: '© 2026 AI Tools Hub · 收录优质 AI 工具导航',
};

export const ads = {
  topBanner: {
    id: 'ad-top-banner',
    label: '顶部横幅广告',
    html: '<div class="ad-placeholder-inner"><span>728 × 90</span><p>在此处放置您的广告代码</p></div>',
  },
  sidebar: {
    id: 'ad-sidebar',
    label: '侧边栏广告',
    html: '<div class="ad-placeholder-inner"><span>300 × 250</span><p>在此处放置您的广告代码</p></div>',
  },
  inline: {
    id: 'ad-inline',
    label: '分类间广告',
    html: '<div class="ad-placeholder-inner"><span>728 × 90</span><p>在此处放置您的广告代码</p></div>',
  },
};

export const categories = [
  {
    id: 'chat',
    name: '对话助手',
    icon: '💬',
    tools: [
      { name: 'ChatGPT', desc: 'OpenAI 旗舰对话模型，支持多模态', icon: '🤖', url: 'https://chat.openai.com', tags: ['免费', '付费'] },
      { name: 'Claude', desc: 'Anthropic 出品，长文本理解能力突出', icon: '🧠', url: 'https://claude.ai', tags: ['免费', '付费'] },
      { name: 'Gemini', desc: 'Google 多模态 AI 助手', icon: '✨', url: 'https://gemini.google.com', tags: ['免费'] },
      { name: 'DeepSeek', desc: '国产开源大模型，推理能力强劲', icon: '🔍', url: 'https://chat.deepseek.com', tags: ['免费'] },
      { name: 'Kimi', desc: '月之暗面出品，超长上下文支持', icon: '🌙', url: 'https://kimi.moonshot.cn', tags: ['免费'] },
      { name: '通义千问', desc: '阿里云大模型，中文理解优秀', icon: '☁️', url: 'https://tongyi.aliyun.com', tags: ['免费'] },
    ],
  },
  {
    id: 'image',
    name: '图像生成',
    icon: '🎨',
    tools: [
      { name: 'Midjourney', desc: '高质量 AI 艺术图像生成', icon: '🖼️', url: 'https://midjourney.com', tags: ['付费'] },
      { name: 'Stable Diffusion', desc: '开源图像生成，可本地部署', icon: '🎭', url: 'https://stability.ai', tags: ['免费', '开源'] },
      { name: 'DALL·E 3', desc: 'OpenAI 图像生成，理解力强', icon: '🎯', url: 'https://openai.com/dall-e-3', tags: ['付费'] },
      { name: '即梦 AI', desc: '字节跳动 AI 图像创作平台', icon: '🌈', url: 'https://jimeng.jianying.com', tags: ['免费'] },
      { name: 'Canva AI', desc: '设计工具内置 AI 图像功能', icon: '✏️', url: 'https://canva.com', tags: ['免费', '付费'] },
    ],
  },
  {
    id: 'code',
    name: '代码开发',
    icon: '💻',
    tools: [
      { name: 'Cursor', desc: 'AI 原生代码编辑器', icon: '⚡', url: 'https://cursor.com', tags: ['免费', '付费'] },
      { name: 'GitHub Copilot', desc: 'AI 编程助手，IDE 深度集成', icon: '🐙', url: 'https://github.com/features/copilot', tags: ['付费'] },
      { name: 'v0', desc: 'Vercel AI 驱动的 UI 生成工具', icon: '🔮', url: 'https://v0.dev', tags: ['免费', '付费'] },
      { name: 'Codeium', desc: '免费 AI 代码补全', icon: '🚀', url: 'https://codeium.com', tags: ['免费'] },
      { name: 'Replit Agent', desc: 'AI 驱动的在线开发环境', icon: '🔧', url: 'https://replit.com', tags: ['免费', '付费'] },
    ],
  },
  {
    id: 'writing',
    name: '写作创作',
    icon: '✍️',
    tools: [
      { name: 'Notion AI', desc: '笔记工具内置 AI 写作助手', icon: '📝', url: 'https://notion.so/product/ai', tags: ['付费'] },
      { name: 'Jasper', desc: '营销文案 AI 写作平台', icon: '📣', url: 'https://jasper.ai', tags: ['付费'] },
      { name: '秘塔写作猫', desc: '中文 AI 写作与校对工具', icon: '🐱', url: 'https://xiezuocat.com', tags: ['免费', '付费'] },
      { name: 'Copy.ai', desc: '多语言 AI 文案生成', icon: '📋', url: 'https://copy.ai', tags: ['免费', '付费'] },
    ],
  },
  {
    id: 'video',
    name: '视频音频',
    icon: '🎬',
    tools: [
      { name: 'Runway', desc: 'AI 视频生成与编辑', icon: '🎥', url: 'https://runway.ml', tags: ['免费', '付费'] },
      { name: 'Pika', desc: '文字/图片转视频 AI', icon: '⚡', url: 'https://pika.art', tags: ['免费', '付费'] },
      { name: 'ElevenLabs', desc: 'AI 语音合成与克隆', icon: '🎙️', url: 'https://elevenlabs.io', tags: ['免费', '付费'] },
      { name: 'Suno', desc: 'AI 音乐生成平台', icon: '🎵', url: 'https://suno.ai', tags: ['免费', '付费'] },
      { name: '剪映 AI', desc: '字节跳动 AI 视频剪辑工具', icon: '✂️', url: 'https://www.capcut.cn', tags: ['免费'] },
    ],
  },
  {
    id: 'productivity',
    name: '效率工具',
    icon: '⚙️',
    tools: [
      { name: 'Perplexity', desc: 'AI 搜索引擎，带引用来源', icon: '🔎', url: 'https://perplexity.ai', tags: ['免费', '付费'] },
      { name: 'Gamma', desc: 'AI 演示文稿与文档生成', icon: '📊', url: 'https://gamma.app', tags: ['免费', '付费'] },
      { name: 'Otter.ai', desc: 'AI 会议记录与转写', icon: '🦦', url: 'https://otter.ai', tags: ['免费', '付费'] },
      { name: 'Remove.bg', desc: 'AI 一键抠图去背景', icon: '🖌️', url: 'https://remove.bg', tags: ['免费', '付费'] },
      { name: 'Photoroom', desc: 'AI 产品图与背景处理', icon: '📸', url: 'https://photoroom.com', tags: ['免费', '付费'] },
    ],
  },
];
