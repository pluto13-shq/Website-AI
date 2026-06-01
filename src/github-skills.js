const GITHUB_API = 'https://api.github.com/search/repositories';

const SEARCH_QUERIES = [
  'skills in:name stars:>1000',
  'SKILL.md in:path stars:>500',
  'cursor skill in:name,description stars:>200',
];

const FETCH_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'ai-tool-nav',
};

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

export async function fetchTopGitHubSkills(limit = 5) {
  for (const query of SEARCH_QUERIES) {
    const url = `${GITHUB_API}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`;

    const res = await fetch(url, { headers: FETCH_HEADERS });

    if (!res.ok) continue;

    const data = await res.json();
    if (data.items?.length > 0) {
      return data.items.slice(0, limit).map(formatRepo);
    }
  }

  throw new Error('未找到 Skills 仓库');
}

export { formatStars };
