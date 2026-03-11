// ============================================================
// ANALYTICS.JS — Harvin Properties
// Tracks page visits, section views, link/button clicks
// Stores data in localStorage for the admin dashboard
// ============================================================

const Analytics = (() => {

  const STORAGE_KEY = 'harvin_analytics';
  const SESSION_KEY = 'harvin_session';

  // ── Helpers ───────────────────────────────────────────────

  function getData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        pageViews: [],
        sectionViews: {},
        clicks: [],
        loginAttempts: [],
        registrations: [],
        roleInterest: { tenant: 0, landlord: 0, manager: 0 },
        tabSwitches: { buy: 0, rent: 0 },
        locationVisits: [],
        contactEvents: [],
      };
    } catch { return { pageViews: [], sectionViews: {}, clicks: [], loginAttempts: [], registrations: [], roleInterest: { tenant: 0, landlord: 0, manager: 0 }, tabSwitches: { buy: 0, rent: 0 }, locationVisits: [], contactEvents: [] }; }
  }

  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
  }

  function getSession() {
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s) {
      s = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem(SESSION_KEY, s);
    }
    return s;
  }

  function now() { return new Date().toISOString(); }

  function todayKey() { return new Date().toISOString().slice(0, 10); }

  // ── Page View ─────────────────────────────────────────────

  function trackPageView() {
    const data = getData();
    const today = todayKey();
    const existing = data.pageViews.find(p => p.date === today);
    if (existing) {
      existing.count++;
      existing.sessions = [...new Set([...existing.sessions, getSession()])];
    } else {
      data.pageViews.push({ date: today, count: 1, sessions: [getSession()] });
    }
    // Keep last 60 days
    data.pageViews = data.pageViews.slice(-60);
    saveData(data);
  }

  // ── Section View ──────────────────────────────────────────

  function trackSectionView(sectionId) {
    const data = getData();
    if (!data.sectionViews[sectionId]) data.sectionViews[sectionId] = 0;
    data.sectionViews[sectionId]++;
    saveData(data);
  }

  // ── Click ─────────────────────────────────────────────────

  function trackClick(label, category = 'general') {
    const data = getData();
    data.clicks.push({ label, category, ts: now(), date: todayKey() });
    // Keep last 500 clicks
    data.clicks = data.clicks.slice(-500);
    saveData(data);
  }

  // ── Tab Switch ────────────────────────────────────────────

  function trackTabSwitch(tab) {
    const data = getData();
    if (!data.tabSwitches) data.tabSwitches = { buy: 0, rent: 0 };
    if (data.tabSwitches[tab] !== undefined) data.tabSwitches[tab]++;
    data.clicks.push({ label: `hero_tab_${tab}`, category: 'tab_switch', ts: now(), date: todayKey() });
    data.clicks = data.clicks.slice(-500);
    saveData(data);
  }

  // ── Auth events ───────────────────────────────────────────

  function trackAuthOpen(role, mode) {
    const data = getData();
    // role interest
    if (data.roleInterest[role] !== undefined) data.roleInterest[role]++;
    // mode-specific
    if (mode === 'login') {
      data.loginAttempts.push({ role, ts: now(), date: todayKey() });
      data.loginAttempts = data.loginAttempts.slice(-200);
    } else {
      data.registrations.push({ role, ts: now(), date: todayKey() });
      data.registrations = data.registrations.slice(-200);
    }
    saveData(data);
  }

  // ── Contact Form Tracking ────────────────────────────────────

  function trackContactEvent(type, detail) {
    const data = getData();
    if (!data.contactEvents) data.contactEvents = [];
    data.contactEvents.push({ type, detail: detail || {}, ts: now(), date: todayKey() });
    // Keep last 300 contact events
    data.contactEvents = data.contactEvents.slice(-300);
    saveData(data);
  }

  // ── Location Tracking ──────────────────────────────────────

  function trackLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const geo = await res.json();
        const a = geo.address || {};
        const city    = a.city || a.town || a.village || a.county || 'Unknown';
        const state   = a.state || '';
        const zip     = a.postcode || '';
        const country = a.country_code ? a.country_code.toUpperCase() : '';
        const label   = [city, state].filter(Boolean).join(', ');

        const data = getData();
        if (!data.locationVisits) data.locationVisits = [];
        const existing = data.locationVisits.find(l => l.zip === zip && l.city === city);
        if (existing) {
          existing.count++;
          existing.lastSeen = todayKey();
          if (!existing.dates) existing.dates = [];
          existing.dates.push(todayKey());
          existing.dates = existing.dates.slice(-60);
        } else {
          data.locationVisits.push({ city, state, zip, country, label, count: 1, firstSeen: todayKey(), lastSeen: todayKey(), dates: [todayKey()] });
        }
        data.locationVisits = data.locationVisits.slice(-200);
        saveData(data);
      } catch(e) {}
    }, () => {}, { timeout: 8000 });
  }

  // ── Init observers ────────────────────────────────────────

  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const seen = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          trackSectionView(e.target.id);
        }
      });
    }, { threshold: 0.25 });
    sections.forEach(s => observer.observe(s));
  }

  function initClickTracking() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-track], a, button');
      if (!el) return;

      // Nav links
      if (el.closest('#navbar') || el.closest('#mobile-menu')) {
        trackClick(el.textContent.trim(), 'navigation');
        return;
      }
      // Auth pills
      if (el.classList.contains('user-type-pill')) {
        const role = el.dataset.type;
        const mode = el.dataset.mode || 'login';
        if (role) {
          trackClick(`${mode}_${role}`, 'auth');
          trackAuthOpen(role, mode);
        }
        return;
      }
      // Modal tabs
      if (el.classList.contains('modal-tab')) {
        trackClick(el.textContent.trim(), 'modal');
        return;
      }
      // Footer links
      if (el.closest('footer')) {
        trackClick(el.textContent.trim(), 'footer');
        return;
      }
      // Social links
      if (el.classList.contains('team-social') || el.classList.contains('footer-social-link')) {
        trackClick(el.getAttribute('aria-label') || el.textContent.trim(), 'social');
      }
    });
  }

  // ── Public API ────────────────────────────────────────────

  function init() {
    trackPageView();
    trackLocation();
    initSectionObserver();
    initClickTracking();
  }

  function getReport() {
    const data = getData();

    // Daily page views (last 14 days)
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const found = data.pageViews.find(p => p.date === key);
      last14.push({ date: key, count: found ? found.count : 0, sessions: found ? found.sessions.length : 0 });
    }

    // Total stats
    const totalViews = data.pageViews.reduce((s, p) => s + p.count, 0);
    const uniqueSessions = new Set(data.pageViews.flatMap(p => p.sessions || [])).size;
    const totalClicks = data.clicks.length;
    const totalLogins = data.loginAttempts.length;
    const totalRegs = data.registrations.length;
    const tabSwitches = data.tabSwitches || { buy: 0, rent: 0 };

    // Clicks by category
    const clicksByCategory = data.clicks.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {});

    // Top clicked labels
    const labelCounts = data.clicks.reduce((acc, c) => {
      acc[c.label] = (acc[c.label] || 0) + 1;
      return acc;
    }, {});
    const topClicks = Object.entries(labelCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, count]) => ({ label, count }));

    // Section views sorted
    const sectionViews = Object.entries(data.sectionViews)
      .sort((a, b) => b[1] - a[1])
      .map(([section, count]) => ({ section, count }));

    return {
      totalViews, uniqueSessions, totalClicks, totalLogins, totalRegs,
      dailyViews: last14,
      clicksByCategory,
      topClicks,
      sectionViews,
      roleInterest: data.roleInterest,
      tabSwitches,
      raw: data,
    };
  }

  function clearData() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { init, getReport, trackClick, trackTabSwitch, clearData, getData, trackContactEvent };

})();
