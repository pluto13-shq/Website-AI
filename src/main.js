import { siteConfig, ads, categories } from './data.js';
import { fetchTopGitHubSkills } from './github-skills.js';

const SKILLS_SECTION_ID = 'github-skills';

const searchInput = document.getElementById('search-input');
const navList = document.getElementById('nav-list');
const toolsContainer = document.getElementById('tools-container');
const searchResult = document.getElementById('search-result');
const footerText = document.getElementById('footer-text');
const skillsList = document.getElementById('github-skills-list');
const skillsRefresh = document.getElementById('skills-refresh');
const skillsCount = document.getElementById('skills-count');
const skillsPanel = document.getElementById('github-skills');

let activeCategory = null;
let cachedSkills = [];

function renderAds() {
  document.getElementById('ad-top').innerHTML = renderAdSlot(ads.topBanner);
  document.getElementById('ad-sidebar').innerHTML = renderAdSlot(ads.sidebar);
}

function renderAdSlot(ad) {
  return `
    <div class="ad-block" data-ad="${ad.id}">
      <span class="ad-label">${ad.label}</span>
      ${ad.html}
    </div>
  `;
}

function renderNav() {
  const categoryItems = categories
    .map(
      (cat) => `
      <li>
        <a href="#${cat.id}" class="nav-link" data-id="${cat.id}">
          <span class="nav-icon">${cat.icon}</span>
          <span>${cat.name}</span>
          <span class="nav-count">${cat.tools.length}</span>
        </a>
      </li>
    `
    )
    .join('');

  const skillsItem = `
    <li>
      <a href="#${SKILLS_SECTION_ID}" class="nav-link nav-link-skills" data-id="${SKILLS_SECTION_ID}">
        <span class="nav-icon">⭐</span>
        <span>热门 Skills</span>
        <span class="nav-count" id="nav-skills-count">${cachedSkills.length || '—'}</span>
      </a>
    </li>
    <li class="nav-divider" aria-hidden="true"></li>
  `;

  navList.innerHTML = categoryItems + skillsItem;

  navList.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.id;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
    });
  });
}

function updateNavSkillsCount(count) {
  const el = document.getElementById('nav-skills-count');
  if (el) el.textContent = count;
}

function setActiveNav(id) {
  activeCategory = id;
  navList.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.id === id);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openExternalLink(url, name) {
  showToast(`正在打开 ${name}…`);
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    window.location.assign(url);
  }
}

function setupToolCardLinks() {
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.tool-card');
    if (!card?.href) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    openExternalLink(card.href, card.querySelector('.tool-name')?.textContent || '工具');
  });
}

function getTagClass(tag) {
  if (tag === '免费') return 'tag tag-free';
  if (tag === '付费') return 'tag tag-paid';
  if (tag === '开源') return 'tag tag-open';
  return 'tag';
}

function renderToolCard(tool) {
  const tags = tool.tags.map((t) => `<span class="${getTagClass(t)}">${t}</span>`).join('');
  return `
    <a href="${tool.url}" class="tool-card" target="_blank" rel="noopener noreferrer" title="点击访问 ${tool.name}" data-name="${tool.name.toLowerCase()}" data-desc="${tool.desc.toLowerCase()}">
      <div class="tool-icon">${tool.icon}</div>
      <div class="tool-info">
        <h3 class="tool-name">${tool.name}</h3>
        <p class="tool-desc">${tool.desc}</p>
        <div class="tool-tags">${tags}</div>
      </div>
      <svg class="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
      </svg>
    </a>
  `;
}

let scrollObserver = null;

function observeSections() {
  if (scrollObserver) scrollObserver.disconnect();
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  [...categories.map((c) => c.id), SKILLS_SECTION_ID]
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .forEach((s) => scrollObserver.observe(s));
}

function filterSkills(query) {
  const q = query.trim().toLowerCase();
  if (!q) return cachedSkills;
  return cachedSkills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.fullName.toLowerCase().includes(q)
  );
}

function renderSkillsSection(query = '') {
  const filtered = filterSkills(query);
  const q = query.trim().toLowerCase();

  if (q && filtered.length === 0) {
    skillsPanel?.classList.add('hidden');
    return 0;
  }

  skillsPanel?.classList.remove('hidden');
  if (filtered.length > 0) {
    renderSkillsList(filtered);
  }
  return filtered.length;
}

function renderCategories(filter = '') {
  const query = filter.trim().toLowerCase();
  let totalVisible = 0;

  toolsContainer.innerHTML = categories
    .map((cat, index) => {
      const filteredTools = cat.tools.filter(
        (t) =>
          !query ||
          t.name.toLowerCase().includes(query) ||
          t.desc.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );

      if (filteredTools.length === 0) return '';

      totalVisible += filteredTools.length;

      const inlineAd =
        index > 0 && index % 2 === 0 && !query
          ? `<div class="ad-slot ad-inline">${renderAdSlot(ads.inline)}</div>`
          : '';

      return `
        ${inlineAd}
        <section class="category-section" id="${cat.id}">
          <div class="category-header">
            <span class="category-icon">${cat.icon}</span>
            <h2 class="category-title">${cat.name}</h2>
            <span class="category-count">${filteredTools.length} 个工具</span>
          </div>
          <div class="tools-grid">
            ${filteredTools.map(renderToolCard).join('')}
          </div>
        </section>
      `;
    })
    .join('');

  const skillsVisible = renderSkillsSection(filter);
  totalVisible += skillsVisible;

  if (query) {
    searchResult.classList.remove('hidden');
    searchResult.textContent =
      totalVisible > 0
        ? `找到 ${totalVisible} 个相关结果（含 Skills）`
        : '未找到匹配的内容，请尝试其他关键词';
  } else {
    searchResult.classList.add('hidden');
  }

  if (totalVisible === 0 && !query) {
    toolsContainer.innerHTML = '<p class="empty-state">暂无工具数据</p>';
  }

  if (!query) observeSections();
}

function setupSearch() {
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => renderCategories(e.target.value), 200);
  });
}

function renderSkillItem(skill) {
  return `
    <a href="${skill.url}" class="tool-card skill-card" target="_blank" rel="noopener noreferrer" title="点击访问 ${skill.fullName}" data-name="${skill.name.toLowerCase()}" data-desc="${skill.desc.toLowerCase()}">
      <div class="tool-icon skill-icon">
        <img src="${skill.avatar}" alt="" width="32" height="32" loading="lazy" />
      </div>
      <div class="tool-info">
        <h3 class="tool-name">${skill.name}</h3>
        <p class="tool-desc">${skill.desc}</p>
        <div class="tool-tags">
          <span class="tag tag-paid">★ ${skill.starsLabel}</span>
          <span class="tag">#${skill.rank}</span>
        </div>
      </div>
      <svg class="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
      </svg>
    </a>
  `;
}

function renderSkillsLoading() {
  skillsList.innerHTML = '<div class="skills-loading">加载中…</div>';
}

function renderSkillsError(message) {
  skillsList.innerHTML = `
    <div class="skills-error">
      <p>${message}</p>
      <button type="button" class="skills-retry">重试</button>
    </div>
  `;
  skillsList.querySelector('.skills-retry')?.addEventListener('click', loadGitHubSkills);
}

function renderSkillsList(skills) {
  skillsList.innerHTML = skills.map(renderSkillItem).join('');
  if (skillsCount) skillsCount.textContent = `${skills.length} 个 Skills`;
  updateNavSkillsCount(skills.length);
}

async function loadGitHubSkills() {
  renderSkillsLoading();
  skillsRefresh?.classList.add('spinning');

  try {
    cachedSkills = await fetchTopGitHubSkills(5);
    renderSkillsSection(searchInput.value);
    updateNavSkillsCount(cachedSkills.length);
    observeSections();
  } catch {
    renderSkillsError('加载失败，请检查网络后重试');
  } finally {
    skillsRefresh?.classList.remove('spinning');
  }
}

function setupGitHubSkills() {
  loadGitHubSkills();
  skillsRefresh?.addEventListener('click', loadGitHubSkills);
}

function init() {
  footerText.textContent = siteConfig.footer;
  renderAds();
  renderNav();
  renderCategories();
  setupSearch();
  setupToolCardLinks();
  setupGitHubSkills();

  if (categories.length > 0) setActiveNav(categories[0].id);
}

init();

export { renderCategories };
