import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, BarChart3, Check, FileSpreadsheet, FolderOpen, Link2, Pencil, Plus, Search, Sparkles } from 'lucide-react';
import './styles.css';

const normalizeUrl = (value) => /^https?:\/\//i.test(value) ? value : `https://${value}`;
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function App() {
  const [page, setPage] = useState('team');
  const [links, setLinks] = useState(() => {
    try {
      const savedLinks = window.localStorage.getItem('first-mile-resources');
      const parsedLinks = savedLinks ? JSON.parse(savedLinks) : { spreadsheets: [], dashboards: [] };
      return {
        spreadsheets: (parsedLinks.spreadsheets || []).map((item) => ({ ...item, owner: item.owner === 'Ananya Kapoor' ? 'Operations HQ' : item.owner })),
        dashboards: (parsedLinks.dashboards || []).map((item) => ({ ...item, owner: item.owner === 'Ananya Kapoor' ? 'Operations HQ' : item.owner })),
      };
    } catch {
      return { spreadsheets: [], dashboards: [] };
    }
  });
  const [form, setForm] = useState({ kind: 'spreadsheets', title: '', url: '', frequent: true });
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [teamSection, setTeamSection] = useState('dashboards');
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('first-mile-resources', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    fetch(`${API_BASE}/resources`).then((response) => response.ok ? response.json() : Promise.reject()).then((resources) => {
      const localResources = JSON.parse(window.localStorage.getItem('first-mile-resources') || '{"spreadsheets":[],"dashboards":[]}');
      if (!resources.spreadsheets.length && !resources.dashboards.length && (localResources.spreadsheets.length || localResources.dashboards.length)) {
        const uploads = Object.entries(localResources).flatMap(([kind, resourceList]) => resourceList.map((resource) => fetch(`${API_BASE}/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, resource }) }).then((result) => result.json())));
        Promise.all(uploads).then(() => fetch(`${API_BASE}/resources`).then((result) => result.json()).then(setLinks));
      } else {
        setLinks(resources);
      }
      setApiReady(true);
    }).catch(() => setApiReady(false));
  }, []);

  const flash = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2600); };
  const openPage = (nextPage) => { setPage(nextPage); setNotice(''); };
  const openTeamSection = (section) => {
    setTeamSection(section);
    setPage('team');
    window.setTimeout(() => document.getElementById(`team-${section}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };
  const renameResource = (type, index, title) => {
    const resource = links[type][index];
    setLinks((current) => ({ ...current, [type]: current[type].map((item, itemIndex) => itemIndex === index ? { ...item, title } : item) }));
    if (apiReady && resource?.id) fetch(`${API_BASE}/resources/${type}/${resource.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) }).catch(() => {});
    flash('Resource renamed');
  };
  const updateResource = (type, index, updates) => {
    const resource = links[type][index];
    setLinks((current) => ({ ...current, [type]: current[type].map((item, itemIndex) => itemIndex === index ? { ...item, ...updates } : item) }));
    if (apiReady && resource?.id) fetch(`${API_BASE}/resources/${type}/${resource.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) }).catch(() => {});
    flash('Resource updated');
  };
  const submitLink = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return flash('Add a name and a link first');
    const item = { title: form.title.trim(), owner: 'Operations HQ', updated: 'Added just now', type: form.kind === 'spreadsheets' ? 'Shared link' : 'Shared dashboard', description: 'Team resource shared from the link center', url: normalizeUrl(form.url.trim()), frequent: form.frequent, color: form.kind === 'spreadsheets' ? 'green' : 'orange' };
    setLinks((current) => ({ ...current, [form.kind]: [item, ...current[form.kind]] }));
    if (apiReady) {
      fetch(`${API_BASE}/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: form.kind, resource: item }) }).then((response) => response.json()).then((savedResource) => setLinks((current) => ({ ...current, [form.kind]: current[form.kind].map((entry) => entry === item ? savedResource : entry) }))).catch(() => {});
    }
    setTeamSection(form.kind === 'dashboards' ? 'dashboards' : 'spreadsheets');
    setPage('team');
    setForm({ kind: form.kind, title: '', url: '', frequent: true });
    flash(`${form.kind === 'spreadsheets' ? 'Spreadsheet' : 'Dashboard'} added to your team workspace`);
  };

  const filtered = (items) => items.filter((item) => `${item.title} ${item.owner} ${item.description || ''}`.toLowerCase().includes(query.toLowerCase()));

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">f</div><div><b>flipkart</b><span>first mile</span></div></div>
      <div className="workspace-switcher"><span className="workspace-dot" /><div><small>Workspace</small><strong>Operations HQ</strong></div></div>
      <nav className="side-nav">
        <p className="nav-label">Workspace</p>
        <button className={`nav-item ${page === 'team' ? 'active' : ''}`} onClick={() => openPage('team')}><span className="nav-icon"><FolderOpen size={17} /></span>Team workspace</button>
        <button className={`nav-item ${page === 'links' ? 'active' : ''}`} onClick={() => openPage('links')}><span className="nav-icon"><Link2 size={17} /></span>Link center</button>
      </nav>
      <div className="sidebar-foot" />
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="breadcrumb"><span>Operations HQ</span><b>/</b><strong>{page === 'links' ? 'Link center' : 'Team workspace'}</strong></div></header>
      {page === 'links' ? <LinkCenter form={form} setForm={setForm} submitLink={submitLink} openPage={openPage} openTeamSection={openTeamSection} /> : <TeamWorkspace links={links} query={query} setQuery={setQuery} filtered={filtered} flash={flash} openPage={openPage} renameResource={renameResource} updateResource={updateResource} teamSection={teamSection} />}
      <footer className="footer"><span>First mile workspace <b>•</b> Shared with Operations HQ</span><span><span className="sync-dot" /> All systems operational</span></footer>
    </main>
    {notice && <div className="toast"><Check size={17} /> {notice}</div>}
  </div>;
}

function LinkCenter({ form, setForm, submitLink, openPage, openTeamSection }) {
  return <>
    <section className="workspace-hero"><div><div className="eyebrow"><span className="live-dot" /> Resource hub</div><h1>Bring your team's links together.</h1><p>Paste a spreadsheet or dashboard link once, then give everyone one place to find it.</p></div><div className="hero-orbit"><Link2 size={24} /><span>+</span><FileSpreadsheet size={25} /><span>+</span><BarChart3 size={25} /></div></section>
    <section className="link-layout"><form className="panel add-link-panel" onSubmit={submitLink}><div className="panel-heading"><div><h2>Add a team resource</h2><p>Paste a link to make it available in the workspace.</p></div><span className="spark"><Sparkles size={16} /></span></div><label>Resource type<select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value, frequent: event.target.value === 'spreadsheets' ? form.frequent : true })}><option value="spreadsheets">Spreadsheet</option><option value="dashboards">Dashboard</option></select></label><label>Resource name<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Regional pickup tracker" /></label><label>Paste link<input value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} placeholder="https://docs.google.com/..." /></label>{form.kind === 'spreadsheets' && <label>Usage frequency<div className="segmented-toggle form-toggle"><button type="button" className={form.frequent ? 'selected' : ''} onClick={() => setForm({ ...form, frequent: true })}>Often used</button><button type="button" className={!form.frequent ? 'selected' : ''} onClick={() => setForm({ ...form, frequent: false })}>Rarely used</button></div></label>}<button className="primary-button add-button" type="submit"><Plus size={17} /> Add to workspace</button><p className="form-note">Links stay visible to your Operations HQ team.</p></form><div className="link-side"><div className="section-intro"><div><span className="section-kicker">Quick start</span><h2>Two places. One source of truth.</h2></div><button className="text-button" onClick={() => openPage('team')}>View team workspace <ArrowUpRight size={15} /></button></div><div className="choice-card" onClick={() => openTeamSection('spreadsheets')}><span className="choice-icon green"><FileSpreadsheet size={20} /></span><div><strong>Team spreadsheets</strong><p>Track capacity, pickups and seller exceptions.</p></div><ArrowUpRight size={16} /></div><div className="choice-card" onClick={() => openTeamSection('dashboards')}><span className="choice-icon orange"><BarChart3 size={20} /></span><div><strong>Team dashboards</strong><p>Open the live views your team checks every day.</p></div><ArrowUpRight size={16} /></div></div></section>
  </>;
}

function TeamWorkspace({ links, query, setQuery, filtered, flash, openPage, renameResource, updateResource, teamSection }) {
  const [sheetFilter, setSheetFilter] = useState('often');
  const spreadsheetItems = filtered(links.spreadsheets).filter((item) => sheetFilter === 'often' ? item.frequent !== false : item.frequent === false);
  return <><section className="workspace-hero compact"><div><div className="eyebrow"><span className="live-dot" /> Shared workspace</div><h1>Your team's operating shelf.</h1><p>Spreadsheets and dashboards, organised for the first-mile team.</p></div><button className="secondary-button" onClick={() => openPage('links')}><Plus size={16} /> Add resource</button></section><div className="workspace-toolbar"><span><strong>{links.spreadsheets.length + links.dashboards.length}</strong> shared resources</span><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" /></div></div><section className="spreadsheet-tools"><span>Spreadsheet shelf</span><div className="segmented-toggle"><button className={sheetFilter === 'often' ? 'selected' : ''} onClick={() => setSheetFilter('often')}>Often used</button><button className={sheetFilter === 'rarely' ? 'selected' : ''} onClick={() => setSheetFilter('rarely')}>Rarely used</button></div></section><ResourceSection id="team-spreadsheets" title="Team spreadsheets" subtitle="Shared working files for daily operations" icon={FileSpreadsheet} items={spreadsheetItems} type="spreadsheet" flash={flash} active={teamSection === 'spreadsheets'} query={query} renameResource={renameResource} updateResource={updateResource} /><ResourceSection id="team-dashboards" title="Team dashboards" subtitle="Live views and performance reports" icon={BarChart3} items={filtered(links.dashboards)} type="dashboard" flash={flash} active={teamSection === 'dashboards'} query={query} renameResource={renameResource} updateResource={updateResource} /></>;
}

function ResourceSection({ id, title, subtitle, icon: Icon, items, type, flash, active, query, renameResource, updateResource }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [draftFrequent, setDraftFrequent] = useState(true);

  const beginRename = (index, currentTitle) => {
    setEditingIndex(index);
    setDraftTitle(currentTitle);
    setDraftUrl(items[index].url || '');
    setDraftFrequent(items[index].frequent !== false);
  };

  const saveRename = (index) => {
    const nextTitle = draftTitle.trim();
    const nextUrl = draftUrl.trim();
    if (nextTitle && nextUrl) updateResource(type === 'spreadsheet' ? 'spreadsheets' : 'dashboards', index, { title: nextTitle, url: normalizeUrl(nextUrl), frequent: draftFrequent });
    setEditingIndex(null);
  };

  return <section id={id} className={`resource-section ${active ? 'section-focus' : ''}`}><div className="section-intro"><div className="resource-title"><span className={`section-icon ${type}`}><Icon size={19} /></span><div><h2>{title}</h2><p>{subtitle}</p></div></div><span className="resource-count">{items.length} resources</span></div><div className="resource-grid">{items.length ? items.map((item, index) => <article className="resource-card" key={`${item.title}-${index}`}><div className="resource-card-top"><span className={`file-icon ${item.color}`}>{type === 'spreadsheet' ? <FileSpreadsheet size={19} /> : <BarChart3 size={19} />}</span><button className="resource-menu" title={editingIndex === index ? 'Save resource' : 'Edit resource'} onClick={() => editingIndex === index ? saveRename(index) : beginRename(index, item.title)}><Pencil size={15} /></button></div>{editingIndex === index ? <><input className="resource-title-input" value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} placeholder="Resource name" autoFocus /><input className="resource-url-input" value={draftUrl} onChange={(event) => setDraftUrl(event.target.value)} placeholder="Resource link" /><select className="resource-frequency" value={draftFrequent ? 'often' : 'rarely'} onChange={(event) => setDraftFrequent(event.target.value === 'often')}><option value="often">Often used</option><option value="rarely">Rarely used</option></select></> : <h3>{item.title}</h3>}<p>{item.description || item.type}</p><div className="resource-meta"><span>{item.owner}</span><span>{item.updated}</span></div><a className={`open-resource ${item.url ? '' : 'disabled'}`} href={item.url || '#'} target={item.url ? '_blank' : undefined} rel={item.url ? 'noreferrer' : undefined} onClick={(event) => { if (!item.url) { event.preventDefault(); flash('This resource does not have a link yet'); } }}>Open resource <ArrowUpRight size={15} /></a></article>) : <div className="empty-state">No resources match “{query}”.</div>}</div></section>;
}

createRoot(document.getElementById('root')).render(<App />);
