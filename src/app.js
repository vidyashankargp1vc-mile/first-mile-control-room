const STORAGE_KEY = 'first-mile-resources-v1';
const FREQUENCY_MIGRATION_KEY = 'fm-reliability-dashboard-frequency-v1';
const SESSION_KEY = 'fm-reliability-user-v1';
const ALLOWED_EMAILS = new Set([
  'vidyashankargp1.vc@flipkart.com',
  'gagan.l1@flipkart.com',
  'saxena.ashish@flipkart.com',
  'sandhani.parasar@flipkart.com',
  'pavan.kumarm1@flipkart.com',
  'vivekananda.gp@flipkart.com',
  'cv.vedesh@flipkart.com',
]);

function loadUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

const initialData = {
  spreadsheets: [
    {
      title: 'FM-2026 Report',
      owner: 'Operations HQ',
      updated: 'Updated today',
      type: 'Shared link',
      description: 'Often used spreadsheet for FM reporting',
      url: 'https://docs.google.com/spreadsheets/d/1NiSZlvFP2zzLzFDd7m3AYpDDBVMy_jqeCsxrLIWeH0Q/edit?gid=1951789101#gid=1951789101',
      frequent: true,
      color: 'green',
    },
    {
      title: 'REPO_DO_1',
      owner: 'Operations HQ',
      updated: 'Shared link',
      type: 'Shared link',
      description: 'Frequently used repository spreadsheet',
      url: 'https://docs.google.com/spreadsheets/d/1pA1Tiuavj8Kp6aD8KZ5oBN3hHOFGOiUAXFni293HOjY/edit#gid=0',
      frequent: true,
      color: 'green',
    },
    {
      title: 'REPO_DBD',
      owner: 'Operations HQ',
      updated: 'Shared link',
      type: 'Shared link',
      description: 'Frequently used repository spreadsheet',
      url: 'https://docs.google.com/spreadsheets/d/1hBkE6lYSKbzL6a2JU-DjCdhpWlBgCbD2ZtqtFJMnGho/edit#gid=0',
      frequent: true,
      color: 'green',
    },
    {
      title: 'REPO_HOLIDAY',
      owner: 'Operations HQ',
      updated: 'Shared link',
      type: 'Shared link',
      description: 'Rarely used holiday repository spreadsheet',
      url: 'https://docs.google.com/spreadsheets/d/1jhrJKykL4zir0kVRIk8BA-WpO78xpj2mI6KNChMCAdA/edit#gid=0',
      frequent: false,
      color: 'green',
    },
    {
      title: 'RAW_DATA_SHEET_URL',
      owner: 'Operations HQ',
      updated: 'Shared link',
      type: 'Shared link',
      description: 'Rarely used raw data spreadsheet',
      url: 'https://docs.google.com/spreadsheets/d/1ruI6-CQuk5Gp0_b7jJFwS137RDktebP26yLFOiOscR8/edit?gid=0#gid=0',
      frequent: false,
      color: 'green',
    },
  ],
  dashboards: [
    {
      title: 'FM Reliability Dashboard Hourly',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Hourly reliability dashboard',
      url: 'https://datastudio.google.com/reporting/16a41d51-79cc-46db-94a0-950e1dde25ce/page/guqxF',
      frequent: true,
      color: 'orange',
    },
    {
      title: 'Low DRR',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Low DRR dashboard',
      url: 'https://datastudio.google.com/reporting/d6ba1ead-6818-4538-b076-a804aca57b2c/page/OGUwF',
      frequent: true,
      color: 'orange',
    },
    {
      title: 'Pincode servicibility',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Pincode serviceability view',
      url: 'https://datastudio.google.com/reporting/c52ab631-304c-43a7-a303-8871cce07a5a',
      frequent: true,
      color: 'orange',
    },
    {
      title: 'MYE Reliability Dashboard',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'MYE reliability dashboard',
      url: 'https://datastudio.google.com/reporting/8226239e-c6f9-45be-8081-d5615ee5cb4b/page/ZLJyF',
      frequent: true,
      color: 'orange',
    },
    {
      title: 'MYS Reliability Dashboard',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'MYS reliability dashboard',
      url: 'https://datastudio.google.com/reporting/f1f94680-7bd2-443c-b9dd-f5d720b181c2/page/5GfyF',
      frequent: false,
      color: 'orange',
    },
    {
      title: 'Hub Cap vs Infra Dashboard',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Hub capacity vs infrastructure dashboard',
      url: 'https://script.google.com/a/macros/flipkart.com/s/AKfycbyZrNtS-Xx-olt0lachVW7m0QZVjlTPWhLPJz5b8K_6D7D6gpIWJjkJS4qqrKQwKLUlBg/exec',
      frequent: false,
      color: 'orange',
    },
    {
      title: 'D-1 Picked Count',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Picked count dashboard',
      url: 'https://gaganl1.github.io/Picked-Count-dashboard/',
      frequent: false,
      color: 'orange',
    },
    {
      title: 'Operational NRT',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared dashboard',
      description: 'Operational NRT dashboard',
      url: 'https://script.google.com/a/macros/flipkart.com/s/AKfycbxErWteckQlJvfaA-oxNspDwCDHOrkQHmFeaZ3bXoMiR9PTy440zzIjBAvJl-byQ9Fr/exec',
      frequent: false,
      color: 'orange',
    },
  ],
  codes: [
    {
      title: 'Shared Codes Folder',
      owner: 'Operations HQ',
      updated: 'Updated now',
      type: 'Shared folder',
      description: 'Google Drive folder for project codes and assets',
      url: 'https://drive.google.com/drive/folders/1LYTD8FkEtW2oZnjgrIYd1FUp7WjWrVqx?usp=sharing',
      frequent: true,
      color: 'orange',
    },
  ],
};

const state = {
  user: loadUser(),
  page: 'team',
  query: '',
  notice: '',
  sheetFilter: 'often',
  teamSection: 'dashboards',
  links: loadLinks(),
};

function loadLinks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData;
    const parsed = JSON.parse(saved);
    if (!localStorage.getItem(FREQUENCY_MIGRATION_KEY)) {
      const defaultDashboards = new Map(initialData.dashboards.map((item) => [item.url, item.frequent]));
      parsed.dashboards = (parsed.dashboards || []).map((item) => defaultDashboards.has(item.url)
        ? { ...item, frequent: defaultDashboards.get(item.url) }
        : item);
      localStorage.setItem(FREQUENCY_MIGRATION_KEY, 'complete');
    }
    const mergeInitialItems = (kind) => {
      const savedItems = Array.isArray(parsed[kind]) ? parsed[kind] : [];
      const savedUrls = new Set(savedItems.map((item) => item.url));
      return [
        ...savedItems,
        ...initialData[kind].filter((item) => !savedUrls.has(item.url)),
      ];
    };
    return {
      spreadsheets: mergeInitialItems('spreadsheets'),
      dashboards: mergeInitialItems('dashboards'),
      codes: mergeInitialItems('codes'),
    };
  } catch {
    return initialData;
  }
}

function saveLinks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.links));
}

function normalizeUrl(value) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function setPage(nextPage) {
  state.page = nextPage;
  renderPage();
}

function setTeamSection(section) {
  state.teamSection = section;
  state.page = 'team';
  renderPage();
  const target = document.getElementById(`team-${section}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function getFilteredItems(kind) {
  const items = state.links[kind] || [];
  const query = state.query.trim().toLowerCase();
  const filtered = query
    ? items.filter((item) => `${item.title} ${item.owner} ${item.description || ''}`.toLowerCase().includes(query))
    : items;

  if (kind === 'spreadsheets' || kind === 'dashboards') {
    return filtered.filter((item) => state.sheetFilter === 'often' ? item.frequent !== false : item.frequent === false);
  }

  return filtered;
}

function renderResourceCard(item, kind, index) {
  const type = kind === 'spreadsheets' ? 'spreadsheet' : 'dashboard';
  const isEditing = state.editingIndex === index && state.editingKind === kind;

  if (isEditing) {
    return `
      <article class="resource-card">
        <div class="resource-card-top">
          <span class="file-icon ${item.color || 'green'}">${kind === 'spreadsheets' ? '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>' : '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v4h-7z"></path><path d="M14 11h7v10h-7z"></path><path d="M3 12h7v10H3z"></path></svg>'}</span>
          <button class="resource-menu" data-action="save-edit" data-kind="${kind}" data-index="${index}" title="Save resource">✓</button>
        </div>
        <input class="resource-title-input" value="${escapeHtml(state.draftTitle)}" data-role="draft-title" placeholder="Resource name" />
        <input class="resource-url-input" value="${escapeHtml(state.draftUrl)}" data-role="draft-url" placeholder="Resource link" />
        ${kind === 'spreadsheets' || kind === 'dashboards' ? `
          <select class="resource-frequency" data-role="draft-frequency">
            <option value="often" ${state.draftFrequent ? 'selected' : ''}>Often used</option>
            <option value="rarely" ${!state.draftFrequent ? 'selected' : ''}>Rarely used</option>
          </select>
        ` : ''}
      </article>
    `;
  }

  return `
    <article class="resource-card">
      <div class="resource-card-top">
        <span class="file-icon ${item.color || 'green'}">${kind === 'spreadsheets' ? '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>' : '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v4h-7z"></path><path d="M14 11h7v10h-7z"></path><path d="M3 12h7v10H3z"></path></svg>'}</span>
          <button class="resource-menu" data-action="edit" data-kind="${kind}" data-url="${escapeAttribute(item.url || '')}" title="Edit resource">✎</button>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description || item.type)}</p>
      <div class="resource-meta"><span>${escapeHtml(item.owner === 'Operations HQ' ? 'FM Reliability' : item.owner)}</span><span>${escapeHtml(item.updated)}</span></div>
      <a class="open-resource" href="${escapeAttribute(item.url || '#')}" target="_blank" rel="noreferrer" ${item.url ? '' : 'onclick="return false"'}>Open resource <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg></a>
    </article>
  `;
}

function renderResourceSection(kind) {
  const labels = {
    spreadsheets: {
      title: 'Team spreadsheets',
      subtitle: 'Shared working files for daily operations',
      iconClass: 'spreadsheet',
      icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>',
    },
    dashboards: {
      title: 'Team dashboards',
      subtitle: 'Live views and performance reports',
      iconClass: 'dashboard',
      icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v4h-7z"></path><path d="M14 11h7v10h-7z"></path><path d="M3 12h7v10H3z"></path></svg>',
    },
    codes: {
      title: 'Team codes',
      subtitle: 'Automation scripts and code references',
      iconClass: 'dashboard',
      icon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 8L4 12l4 4"></path><path d="M16 8l4 4-4 4"></path><path d="M14 4l-4 16"></path></svg>',
    },
  };
  const meta = labels[kind] || labels.spreadsheets;
  const items = getFilteredItems(kind);
  const sectionClass = state.teamSection === kind ? 'resource-section section-focus' : 'resource-section';
  const countText = `${items.length} resources`;

  return `
    <section id="team-${kind}" class="${sectionClass}">
      <div class="section-intro">
        <div class="resource-title">
          <span class="section-icon ${meta.iconClass}">${meta.icon}</span>
          <div>
            <h2>${meta.title}</h2>
            <p>${meta.subtitle}</p>
          </div>
        </div>
        <span class="resource-count">${countText}</span>
      </div>
      <div class="resource-grid">
        ${items.length ? items.map((item) => renderResourceCard(item, kind, state.links[kind].indexOf(item))).join('') : `<div class="empty-state">No resources match “${escapeHtml(state.query)}”.</div>`}
      </div>
    </section>
  `;
}

function renderUsageToggle() {
  return `
    <section class="spreadsheet-tools page-usage-toggle">
      <span>Usage</span>
      <div class="segmented-toggle">
        <button type="button" class="${state.sheetFilter === 'often' ? 'selected' : ''}" data-filter="often">Often used</button>
        <button type="button" class="${state.sheetFilter === 'rarely' ? 'selected' : ''}" data-filter="rarely">Rarely used</button>
      </div>
    </section>
  `;
}

function renderCategoryPage(kind) {
  const labels = {
    spreadsheets: {
      title: 'Spreadsheets',
      subtitle: 'Shared working files for daily operations',
    },
    dashboards: {
      title: 'Dashboards',
      subtitle: 'Live operational views and KPI dashboards',
    },
    codes: {
      title: 'Codes',
      subtitle: 'Scripts, snippets, and tooling references',
    },
  };
  const meta = labels[kind] || labels.spreadsheets;

  const items = getFilteredItems(kind);
  return `
    <section class="workspace-hero compact">
      <div>
        <div class="eyebrow"><span class="live-dot"></span> ${meta.title}</div>
        <h1>${meta.title}</h1>
        <p>${meta.subtitle}</p>
      </div>
    </section>

    ${renderUsageToggle()}

    <div class="workspace-toolbar">
      <span><strong>${items.length}</strong> ${kind} resources</span>
      <div class="search-box">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>
        <input type="text" id="search-input" value="${escapeAttribute(state.query)}" placeholder="Search ${kind}" />
      </div>
    </div>

    <section class="resource-section">
      <div class="resource-grid">
        ${items.length ? items.map((item) => renderResourceCard(item, kind, state.links[kind].indexOf(item))).join('') : `<div class="empty-state">No ${kind} match “${escapeHtml(state.query)}”.</div>`}
      </div>
    </section>
  `;
}

function renderTeamWorkspace() {
  return `
    <section class="workspace-hero compact">
      <div>
        <div class="eyebrow"><span class="live-dot"></span> Shared workspace</div>
        <h1>Welcome to FM Reliability.</h1>
        <p>Select a workspace to open its resources.</p>
      </div>
    </section>

    <section class="resource-section link-side">
      <div class="section-intro">
        <div>
          <span class="section-kicker">Team workspace</span>
          <h2>Choose where to go</h2>
        </div>
      </div>
      <div class="link-layout">
        <button class="choice-card" data-action="go-page" data-page="spreadsheets">
          <span class="choice-icon green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg></span>
          <div><strong>Spreadsheets</strong><p>Open shared operational spreadsheets.</p></div>
        </button>
        <button class="choice-card" data-action="go-page" data-page="dashboards">
          <span class="choice-icon orange"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v4h-7z"></path><path d="M14 11h7v10h-7z"></path><path d="M3 12h7v10H3z"></path></svg></span>
          <div><strong>Dashboards</strong><p>Open live operational dashboards.</p></div>
        </button>
        <button class="choice-card" data-action="go-page" data-page="links">
          <span class="choice-icon green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L12 4"></path><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12 20"></path></svg></span>
          <div><strong>Link Center</strong><p>Reach out or choose a resource page.</p></div>
        </button>
      </div>
    </section>
  `;
}

function renderLinkCenter() {
  return `
    <section class="link-page-title">
      <div class="link-page-title-icon">ↄ</div>
      <div>
        <h1>Link Center &amp; Resource Additions</h1>
        <p>Central point of contact for onboarding operational tools &amp; links</p>
      </div>
      <span class="admin-badge">FM Reliability Managed</span>
    </section>

    <section class="link-contact-card">
      <div class="link-contact-header">
        <div class="mail-icon">✉</div>
        <div>
          <span class="link-kicker">RESOURCE ADDITIONS &amp; UPDATES</span>
          <h2>Reach out to Vidyashankar GP</h2>
          <strong>vidyashankargp1.vc@flipkart.com</strong>
        </div>
        <button class="copy-email-button" data-action="copy-email" type="button">▣&nbsp; Copy Email Address</button>
      </div>
      <div class="link-divider"></div>
      <p class="link-instruction"><span>ⓘ</span> Please include the following details in your email to Vidyashankar:</p>
      <div class="link-detail-grid">
        <div class="link-detail-card"><span class="detail-icon green">▤</span><div><strong>1. Resource Name &amp; URL</strong><p>Official title and link (Sheets, Looker, Script)</p></div></div>
        <div class="link-detail-card"><span class="detail-icon orange">▦</span><div><strong>2. Resource Type</strong><p>Spreadsheet, Dashboard, or Code / Runbook</p></div></div>
        <div class="link-detail-card"><span class="detail-icon blue">&lt;/&gt;</span><div><strong>3. Usage Frequency</strong><p>Often used (daily cutoff) or Rarely used</p></div></div>
        <div class="link-detail-card"><span class="detail-icon purple">ↄ</span><div><strong>4. Team Context</strong><p>Brief description for FM Reliability team</p></div></div>
      </div>
      <div class="link-verification"><span>Requests are verified and updated on the shared workspace within business hours.</span><strong>FM Reliability</strong></div>
    </section>
  `;
}

function renderPage() {
  const target = document.getElementById('page-root');
  if (!target) return;

  const html = state.page === 'links'
    ? renderLinkCenter()
    : state.page === 'spreadsheets' || state.page === 'dashboards'
      ? renderCategoryPage(state.page)
      : renderTeamWorkspace();

  target.innerHTML = html;

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      state.query = event.target.value;
      renderPage();
    });
  }

  document.querySelectorAll('[data-action="go-page"]').forEach((button) => {
    button.addEventListener('click', () => setPage(button.dataset.page));
  });

  document.querySelectorAll('[data-action="copy-email"]').forEach((button) => {
    button.addEventListener('click', async () => {
      await navigator.clipboard?.writeText('vidyashankargp1.vc@flipkart.com');
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = '▣  Copy Email Address'; }, 1800);
    });
  });

  document.querySelectorAll('[data-action="logout"]').forEach((button) => {
    button.addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      state.user = null;
      renderLoginPage();
    });
  });

  document.querySelectorAll('[data-team-section]').forEach((item) => {
    item.addEventListener('click', () => setTeamSection(item.dataset.teamSection));
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.sheetFilter = button.dataset.filter;
      renderPage();
    });
  });

  document.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      const kind = button.dataset.kind;
      const index = state.links[kind].findIndex((item) => item.url === button.dataset.url);
      if (index === -1) return;
      const item = state.links[kind][index];
      state.editingKind = kind;
      state.editingIndex = index;
      state.draftTitle = item.title;
      state.draftUrl = item.url || '';
      state.draftFrequent = item.frequent !== false;
      renderPage();
    });
  });

  document.querySelectorAll('[data-action="save-edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      const kind = button.dataset.kind;
      const index = Number(button.dataset.index);
      const title = (document.querySelector('[data-role="draft-title"]').value || '').trim();
      const url = (document.querySelector('[data-role="draft-url"]').value || '').trim();
      const frequencyEl = document.querySelector('[data-role="draft-frequency"]');
      const frequent = kind === 'spreadsheets' || kind === 'dashboards'
        ? (frequencyEl ? frequencyEl.value === 'often' : true)
        : true;

      if (!title || !url) {
        showToast('Add a name and a link first');
        return;
      }

      state.links[kind][index] = {
        ...state.links[kind][index],
        title,
        url: normalizeUrl(url),
        frequent,
        updated: 'Updated just now',
      };
      state.editingKind = null;
      state.editingIndex = null;
      saveLinks();
      if (kind === 'spreadsheets' || kind === 'dashboards') {
        state.sheetFilter = frequent ? 'often' : 'rarely';
      }
      showToast('Resource updated');
      renderPage();
    });
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      setPage(button.dataset.page);
    });
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    const isActive = (button.dataset.page === state.page);
    button.classList.toggle('active', isActive);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value)
    .replace(/`/g, '&#96;');
}

function bindSidebarNavigation() {
  const root = document.getElementById('page-root');
  if (!root) return;
}

function renderLoginPage() {
  const appShell = document.getElementById('app-shell');
  if (!appShell) return;

  appShell.className = '';
  appShell.innerHTML = `
    <main class="login-shell">
      <div class="login-brand"><div class="brand-top"><img class="brand-logo" src="./public/flipkart-logo.png" alt="Flipkart" /><span class="brand-wordmark">Flipkart</span></div><span class="workspace-name">FM Reliability</span></div>
      <div class="login-layout">
        <section class="login-copy">
          <div class="eyebrow"><span class="live-dot"></span> FM Reliability</div>
          <h1>One workspace for every first-mile signal.</h1>
          <p>Sign in with your Flipkart identity to open the team workspace and its shared operational resources.</p>
          <div class="login-stripe"><span class="workspace-dot"></span> Flipkart team access only</div>
        </section>
        <form class="panel login-card" id="login-form">
          <div class="login-icon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
          <h2>Welcome to FM Reliability</h2>
          <p>Enter your approved Flipkart email to continue.</p>
          <label for="login-email">Flipkart email</label>
          <input id="login-email" name="email" type="email" autocomplete="email" required placeholder="name@flipkart.com" />
          <button class="primary-button login-button" type="submit">Enter team workspace</button>
          <span class="login-help">Access is limited to approved FM Reliability email addresses.</span>
          <span class="login-error" id="login-error" role="alert"></span>
        </form>
      </div>
    </main>
  `;

  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const error = document.getElementById('login-error');

    if (!ALLOWED_EMAILS.has(email)) {
      error.textContent = 'This email is not approved for FM Reliability access.';
      return;
    }

    state.user = { email };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state.user));
    init();
  });
}

async function init() {
  const appShell = document.getElementById('app-shell');
  if (!appShell) return;
  if (!state.user) {
    renderLoginPage();
    return;
  }

  appShell.className = 'app-shell';

  appShell.innerHTML = `
    <aside class="sidebar">
      <div class="brand"><div class="brand-top"><img class="brand-logo" src="./public/flipkart-logo.png" alt="Flipkart" /><span class="brand-wordmark">Flipkart</span></div><span class="workspace-name">FM Reliability</span></div>
      <div class="workspace-switcher"><span class="workspace-dot"></span><div><small>Workspace</small><strong>FM Reliability</strong></div></div>
      <nav class="side-nav">
        <p class="nav-label">Workspace</p>
        <button class="nav-item ${state.page === 'team' ? 'active' : ''}" data-page="team"><span class="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path></svg></span>Team workspace</button>
        <button class="nav-item ${state.page === 'spreadsheets' ? 'active' : ''}" data-page="spreadsheets"><span class="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg></span>Spreadsheets</button>
        <button class="nav-item ${state.page === 'dashboards' ? 'active' : ''}" data-page="dashboards"><span class="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v4h-7z"></path><path d="M14 11h7v10h-7z"></path><path d="M3 12h7v10H3z"></path></svg></span>Dashboards</button>
        <button class="nav-item ${state.page === 'links' ? 'active' : ''}" data-page="links"><span class="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L12 4"></path><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12 20"></path></svg></span>Link center</button>
      </nav>
      <div class="sidebar-foot"></div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumb"><span>FM Reliability</span><b>/</b><strong>${state.page === 'links' ? 'Link center' : state.page === 'spreadsheets' ? 'Spreadsheets' : state.page === 'dashboards' ? 'Dashboards' : 'Team workspace'}</strong></div>
        <button class="logout-button" data-action="logout" type="button" title="Log out">↪ <span>Log out</span></button>
      </header>
      <div id="page-root"></div>
      <footer class="footer"><span>FM Reliability workspace <b>•</b> Shared with FM Reliability</span><span><span class="sync-dot"></span>All systems operational</span></footer>
    </main>
  `;

  renderPage();

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      state.page = button.dataset.page;
      renderPage();
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === state.page));
    });
  });
}

window.addEventListener('DOMContentLoaded', init);
