// ============================================================
// THEME.JS — Harvin Properties
// Shared theme system between admin and homepage.
// Admin calls ThemeManager.set(name) → saves to localStorage
// Homepage calls ThemeManager.init() → reads localStorage and applies
// ============================================================

const ThemeManager = (() => {

  const STORAGE_KEY = 'hp_site_theme';

  // Full CSS variable palettes for the homepage
  const THEMES = {
    ocean: {
      '--bg':             '#F8FAFF',
      '--bg-card':        '#FFFFFF',
      '--bg-subtle':      '#EEF4FF',
      '--border':         'rgba(14,165,233,0.14)',
      '--border-hover':   'rgba(14,165,233,0.35)',
      '--border-strong':  'rgba(14,165,233,0.22)',
      '--text-primary':   '#0F172A',
      '--text-secondary': '#475569',
      '--text-muted':     '#94A3B8',
      '--blue':           '#0EA5E9',
      '--blue-dark':      '#0284C7',
      '--blue-light':     '#BAE6FD',
      '--blue-dim':       'rgba(14,165,233,0.10)',
      '--modal-accent':   '#0EA5E9',
      '--hero-grad':      'linear-gradient(145deg,#E0F2FE 0%,#F0F9FF 35%,#FEF9EE 70%,#F8FAFF 100%)',
      '--hero-blob1':     'rgba(14,165,233,0.15)',
      '--hero-blob2':     'rgba(245,158,11,0.12)',
      '--team-bg':        'linear-gradient(180deg,#EFF8FF 0%,#F8FAFF 100%)',
      '--footer-bg':      '#0C1628',
      '--navbar-bg':      'rgba(255,255,255,0.97)',
      '--shadow-sm':      '0 1px 4px rgba(14,165,233,0.08)',
      '--shadow-card':    '0 4px 24px rgba(14,165,233,0.10),0 1px 4px rgba(0,0,0,0.03)',
      '--shadow-modal':   '0 20px 60px rgba(14,165,233,0.16),0 4px 16px rgba(0,0,0,0.07)',
      '--shadow-hover':   '0 12px 40px rgba(14,165,233,0.18)',
    },
    blaze: {
      '--bg':             '#111111',
      '--bg-card':        '#1E1E1E',
      '--bg-subtle':      '#252525',
      '--border':         'rgba(249,115,22,0.18)',
      '--border-hover':   'rgba(249,115,22,0.45)',
      '--border-strong':  'rgba(249,115,22,0.28)',
      '--text-primary':   '#F5F5F5',
      '--text-secondary': '#A3A3A3',
      '--text-muted':     '#525252',
      '--blue':           '#F97316',
      '--blue-dark':      '#EA580C',
      '--blue-light':     '#FED7AA',
      '--blue-dim':       'rgba(249,115,22,0.12)',
      '--modal-accent':   '#F97316',
      '--hero-grad':      'linear-gradient(145deg,#0D0D0D 0%,#181818 40%,#1F1209 100%)',
      '--hero-blob1':     'rgba(249,115,22,0.12)',
      '--hero-blob2':     'rgba(234,88,12,0.08)',
      '--team-bg':        'linear-gradient(180deg,#161616 0%,#111111 100%)',
      '--footer-bg':      '#080808',
      '--navbar-bg':      'rgba(17,17,17,0.97)',
      '--shadow-sm':      '0 1px 4px rgba(0,0,0,0.3)',
      '--shadow-card':    '0 4px 24px rgba(0,0,0,0.4),0 1px 4px rgba(0,0,0,0.2)',
      '--shadow-modal':   '0 20px 60px rgba(0,0,0,0.6),0 4px 16px rgba(0,0,0,0.3)',
      '--shadow-hover':   '0 12px 40px rgba(249,115,22,0.20)',
    },
    emerald: {
      '--bg':             '#F0FDF4',
      '--bg-card':        '#FFFFFF',
      '--bg-subtle':      '#DCFCE7',
      '--border':         'rgba(16,185,129,0.15)',
      '--border-hover':   'rgba(16,185,129,0.40)',
      '--border-strong':  'rgba(16,185,129,0.24)',
      '--text-primary':   '#064E3B',
      '--text-secondary': '#065F46',
      '--text-muted':     '#6EE7B7',
      '--blue':           '#10B981',
      '--blue-dark':      '#059669',
      '--blue-light':     '#A7F3D0',
      '--blue-dim':       'rgba(16,185,129,0.10)',
      '--modal-accent':   '#10B981',
      '--hero-grad':      'linear-gradient(145deg,#ECFDF5 0%,#F0FDF4 40%,#F7FEF9 100%)',
      '--hero-blob1':     'rgba(16,185,129,0.14)',
      '--hero-blob2':     'rgba(5,150,105,0.08)',
      '--team-bg':        'linear-gradient(180deg,#ECFDF5 0%,#F0FDF4 100%)',
      '--footer-bg':      '#022C22',
      '--navbar-bg':      'rgba(240,253,244,0.97)',
      '--shadow-sm':      '0 1px 4px rgba(16,185,129,0.08)',
      '--shadow-card':    '0 4px 24px rgba(16,185,129,0.10),0 1px 4px rgba(0,0,0,0.03)',
      '--shadow-modal':   '0 20px 60px rgba(16,185,129,0.16),0 4px 16px rgba(0,0,0,0.06)',
      '--shadow-hover':   '0 12px 40px rgba(16,185,129,0.18)',
    },
    midnight: {
      '--bg':             '#0D0D1A',
      '--bg-card':        '#18183A',
      '--bg-subtle':      '#13132A',
      '--border':         'rgba(139,92,246,0.20)',
      '--border-hover':   'rgba(139,92,246,0.50)',
      '--border-strong':  'rgba(139,92,246,0.30)',
      '--text-primary':   '#EDE9FE',
      '--text-secondary': '#C4B5FD',
      '--text-muted':     '#6D28D9',
      '--blue':           '#8B5CF6',
      '--blue-dark':      '#7C3AED',
      '--blue-light':     '#DDD6FE',
      '--blue-dim':       'rgba(139,92,246,0.12)',
      '--modal-accent':   '#8B5CF6',
      '--hero-grad':      'linear-gradient(145deg,#0A0A1F 0%,#0F0F28 40%,#12082B 100%)',
      '--hero-blob1':     'rgba(139,92,246,0.14)',
      '--hero-blob2':     'rgba(109,40,217,0.09)',
      '--team-bg':        'linear-gradient(180deg,#111128 0%,#0D0D1A 100%)',
      '--footer-bg':      '#05050F',
      '--navbar-bg':      'rgba(13,13,26,0.97)',
      '--shadow-sm':      '0 1px 4px rgba(0,0,0,0.3)',
      '--shadow-card':    '0 4px 24px rgba(0,0,0,0.4),0 1px 4px rgba(0,0,0,0.2)',
      '--shadow-modal':   '0 20px 60px rgba(0,0,0,0.6),0 4px 16px rgba(139,92,246,0.15)',
      '--shadow-hover':   '0 12px 40px rgba(139,92,246,0.22)',
    },
    rose: {
      '--bg':             '#FFF1F2',
      '--bg-card':        '#FFFFFF',
      '--bg-subtle':      '#FFE4E6',
      '--border':         'rgba(244,63,94,0.15)',
      '--border-hover':   'rgba(244,63,94,0.40)',
      '--border-strong':  'rgba(244,63,94,0.22)',
      '--text-primary':   '#4C0519',
      '--text-secondary': '#9F1239',
      '--text-muted':     '#FDA4AF',
      '--blue':           '#F43F5E',
      '--blue-dark':      '#E11D48',
      '--blue-light':     '#FECDD3',
      '--blue-dim':       'rgba(244,63,94,0.10)',
      '--modal-accent':   '#F43F5E',
      '--hero-grad':      'linear-gradient(145deg,#FFF1F2 0%,#FFF5F6 40%,#FEF2F2 100%)',
      '--hero-blob1':     'rgba(244,63,94,0.12)',
      '--hero-blob2':     'rgba(225,29,72,0.08)',
      '--team-bg':        'linear-gradient(180deg,#FFF1F2 0%,#FFF5F6 100%)',
      '--footer-bg':      '#4C0519',
      '--navbar-bg':      'rgba(255,241,242,0.97)',
      '--shadow-sm':      '0 1px 4px rgba(244,63,94,0.08)',
      '--shadow-card':    '0 4px 24px rgba(244,63,94,0.10),0 1px 4px rgba(0,0,0,0.03)',
      '--shadow-modal':   '0 20px 60px rgba(244,63,94,0.16),0 4px 16px rgba(0,0,0,0.06)',
      '--shadow-hover':   '0 12px 40px rgba(244,63,94,0.18)',
    },
  };

  // Apply CSS variable palette to the page's <html> element
  function applyToPage(themeName) {
    const palette = THEMES[themeName];
    if (!palette) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', themeName);
    Object.entries(palette).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
  }

  // Save theme choice to localStorage (read by both pages)
  function save(themeName) {
    try { localStorage.setItem(STORAGE_KEY, themeName); } catch(e) {}
  }

  // Load saved theme name, defaulting to 'ocean'
  function load() {
    try { return localStorage.getItem(STORAGE_KEY) || 'ocean'; } catch(e) { return 'ocean'; }
  }

  // Called by ADMIN when user picks a theme:
  // saves it AND applies it immediately to the admin page
  function set(themeName) {
    save(themeName);
    applyToPage(themeName);
  }

  // Called by HOMEPAGE on load:
  // reads saved theme and applies it — no flash
  function init() {
    applyToPage(load());
  }

  return { THEMES, set, load, init };

})();
