const GITHUB_API = import.meta.env.DEV
  ? '/api/github/search/repositories'
  : 'https://api.github.com/search/repositories';

const SEARCH_QUERIES = [
  'skills in:name stars:>1000',
  'SKILL.md in:path stars:>500',
  'cursor skill in:name,description stars:>200',
];

export const SKILLS_LIMIT = 6;

const FALLBACK_SKILLS = [
  {
    rank: 1,
    name: 'andrej-karpathy-skills',
    fullName: 'multica-ai/andrej-karpathy-skills',
    desc: '基于 Karpathy 观察改进 Claude Code 行为的 CLAUDE.md 技能集',
    stars: 163900,
    starsLabel: '163.9k',
    url: 'https://github.com/multica-ai/andrej-karpathy-skills',
    avatar: 'https://avatars.githubusercontent.com/u/254743058?v=4',
  },
  {
    rank: 2,
    name: 'skills',
    fullName: 'anthropics/skills',
    desc: 'Anthropic 官方 Agent Skills 公开仓库',
    stars: 144839,
    starsLabel: '144.8k',
    url: 'https://github.com/anthropics/skills',
    avatar: 'https://avatars.githubusercontent.com/u/76263028?v=4',
  },
  {
    rank: 3,
    name: 'skills',
    fullName: 'mattpocock/skills',
    desc: '面向工程师的 Skills 集合，来自作者 .claude 目录',
    stars: 113452,
    starsLabel: '113.5k',
    url: 'https://github.com/mattpocock/skills',
    avatar: 'https://avatars.githubusercontent.com/u/28293326?v=4',
  },
  {
    rank: 4,
    name: 'awesome-claude-skills',
    fullName: 'ComposioHQ/awesome-claude-skills',
    desc: '精选 Claude Skills、资源与工具列表',
    stars: 62729,
    starsLabel: '62.7k',
    url: 'https://github.com/ComposioHQ/awesome-claude-skills',
    avatar: 'https://avatars.githubusercontent.com/u/128464815?v=4',
  },
  {
    rank: 5,
    name: 'awesome-openclaw-skills',
    fullName: 'VoltAgent/awesome-openclaw-skills',
    desc: 'OpenClaw Skills 精选合集，5400+ 技能分类整理',
    stars: 49615,
    starsLabel: '49.6k',
    url: 'https://github.com/VoltAgent/awesome-openclaw-skills',
    avatar: 'https://avatars.githubusercontent.com/u/184454679?v=4',
  },
  {
    rank: 6,
    name: 'superpowers',
    fullName: 'obra/superpowers',
    desc: 'Claude Code 核心技能库：头脑风暴、TDD、调试等工作流',
    stars: 42000,
    starsLabel: '42.0k',
    url: 'https://github.com/obra/superpowers',
    avatar: 'https://avatars.githubusercontent.com/u/778?v=4',
  },
];

function formatStars(count) {
  if (count >= 10000) return `${(count / 1000).toFixed(1)}k`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function formatRepo(repo, index) {
  const name = repo.full_name.split('/').pop();
  return {
    rank: index + 1,
    name,
    fullName: repo.full_name,
    desc: repo.description || '暂无描述',
    stars: repo.stargazers_count,
    starsLabel: formatStars(repo.stargazers_count),
    url: repo.html_url,
    avatar: repo.owner?.avatar_url,
  };
}

async function fetchFromGitHub(limit) {
  for (const query of SEARCH_QUERIES) {
    const url = `${GITHUB_API}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`;

    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!res.ok) continue;

    const data = await res.json();
    if (data.items?.length > 0) {
      return data.items.slice(0, limit).map(formatRepo);
    }
  }

  return null;
}

export async function fetchTopGitHubSkills(limit = SKILLS_LIMIT) {
  try {
    const live = await fetchFromGitHub(limit);
    if (live?.length) return live;
  } catch {
    // 网络或 CORS 失败时使用本地备用数据
  }

  return FALLBACK_SKILLS.slice(0, limit);
}

export { formatStars };
