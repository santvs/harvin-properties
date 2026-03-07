// ============================================================
// APP.JS — Main application logic
// ============================================================

const state = {
  activeUserType: null,
  activeAuthMode: "login",
  modalOpen: false,
};

const dom = {
  modal: () => document.getElementById("auth-modal"),
  modalOverlay: () => document.getElementById("modal-overlay"),
  modalTitle: () => document.getElementById("modal-title"),
  modalSubtitle: () => document.getElementById("modal-subtitle"),
  formContainer: () => document.getElementById("form-container"),
  tabLogin: () => document.getElementById("tab-login"),
  tabRegister: () => document.getElementById("tab-register"),
  userTypePills: () => document.querySelectorAll(".user-type-pill"),
  modalUserIcon: () => document.getElementById("modal-user-icon"),
  teamGrid: () => document.getElementById("team-grid"),
  footerColumns: () => document.getElementById("footer-columns"),
  footerSocial: () => document.getElementById("footer-social"),
  footerLegal: () => document.getElementById("footer-legal"),
  footerYear: () => document.getElementById("footer-year"),
  heroTitle: () => document.getElementById("hero-title"),
  heroSubtitle: () => document.getElementById("hero-subtitle"),
};

// ── Modal ──────────────────────────────────────────────────

function openModal(userTypeId, mode = "login") {
  state.activeUserType = userTypeId;
  state.activeAuthMode = mode;
  state.modalOpen = true;

  const userType = USER_TYPES[userTypeId];
  document.documentElement.style.setProperty("--modal-accent", userType.accent);
  dom.modalUserIcon().textContent = userType.icon;
  updateModalTabs();
  renderForm();

  dom.modal().classList.add("open");
  dom.modalOverlay().classList.add("open");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const firstInput = dom.formContainer().querySelector("input");
    if (firstInput) firstInput.focus();
  }, 300);
}

function closeModal() {
  state.modalOpen = false;
  dom.modal().classList.remove("open");
  dom.modalOverlay().classList.remove("open");
  document.body.style.overflow = "";
}

function switchAuthMode(mode) {
  state.activeAuthMode = mode;
  updateModalTabs();
  renderForm();
}

function updateModalTabs() {
  const isLogin = state.activeAuthMode === "login";
  const userType = USER_TYPES[state.activeUserType];
  dom.tabLogin().classList.toggle("active", isLogin);
  dom.tabRegister().classList.toggle("active", !isLogin);
  dom.tabLogin().setAttribute("aria-selected", isLogin);
  dom.tabRegister().setAttribute("aria-selected", !isLogin);
  dom.modalTitle().textContent = isLogin ? `Welcome back, ${userType.label}` : `Join as ${userType.label}`;
  dom.modalSubtitle().textContent = isLogin ? userType.description : `Create your ${userType.label.toLowerCase()} account`;
}

// ── Form ───────────────────────────────────────────────────

function renderForm() {
  const userType = USER_TYPES[state.activeUserType];
  const fields = state.activeAuthMode === "login" ? userType.loginFields : userType.registerFields;
  const rows = fields.map((f) => renderField(f)).join("");
  const forgotLink = state.activeAuthMode === "login"
    ? `<div class="forgot-row"><a href="#" class="forgot-link">Forgot password?</a></div>` : "";
  const submitLabel = state.activeAuthMode === "login" ? "Sign In" : "Create Account";

  dom.formContainer().innerHTML = `
    <form class="auth-form" id="auth-form" novalidate>
      <div class="form-fields">${rows}</div>
      ${forgotLink}
      <button type="submit" class="btn-submit">
        <span>${submitLabel}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </form>
  `;
  document.getElementById("auth-form").addEventListener("submit", handleFormSubmit);
}

function renderField(field) {
  return `
    <div class="form-group">
      <label for="field-${field.id}" class="form-label">
        ${field.label}${field.required ? '<span class="required-dot" aria-hidden="true"> *</span>' : ""}
      </label>
      <input id="field-${field.id}" type="${field.type}" name="${field.id}"
        placeholder="${field.placeholder}" ${field.required ? "required" : ""}
        class="form-input" autocomplete="${getAutocomplete(field.id)}" />
      <span class="field-error" id="err-${field.id}" role="alert"></span>
    </div>`;
}

function getAutocomplete(fieldId) {
  return { email:"email", password:"current-password", confirmPassword:"new-password",
    firstName:"given-name", lastName:"family-name", phone:"tel", currentAddress:"street-address" }[fieldId] || "off";
}

// ── Validation ─────────────────────────────────────────────

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let valid = true;

  form.querySelectorAll(".field-error").forEach(el => el.textContent = "");
  form.querySelectorAll(".form-input").forEach(el => el.classList.remove("error"));

  form.querySelectorAll("input[required]").forEach(input => {
    if (!input.value.trim()) { showFieldError(input, "This field is required"); valid = false; }
    else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showFieldError(input, "Enter a valid email address"); valid = false;
    }
  });

  const pw = form.querySelector('[name="password"]');
  const cpw = form.querySelector('[name="confirmPassword"]');
  if (pw && cpw && pw.value && cpw.value && pw.value !== cpw.value) {
    showFieldError(cpw, "Passwords do not match"); valid = false;
  }

  if (!valid) return;

  const btn = form.querySelector(".btn-submit");
  btn.classList.add("loading"); btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove("loading"); btn.disabled = false;
    showSuccessToast(state.activeAuthMode === "login" ? "Signed in successfully!" : "Account created! Welcome to Harvin Properties.");
    closeModal();
  }, 1500);
}

function showFieldError(input, message) {
  input.classList.add("error");
  const errEl = document.getElementById(`err-${input.name}`);
  if (errEl) errEl.textContent = message;
}

// ── Toast ──────────────────────────────────────────────────

function showSuccessToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ── Team ───────────────────────────────────────────────────

function renderTeam() {
  const grid = dom.teamGrid();
  if (!grid) return;
  grid.innerHTML = TEAM_MEMBERS.map((member, i) => `
    <article class="team-card" style="--card-accent:${member.accentColor};animation-delay:${i*0.07}s;" role="listitem">
      <div class="team-avatar-wrap">
        <div class="team-avatar" style="background:${member.accentColor}18;border-color:${member.accentColor}40;">
          <span class="team-initials" style="color:${member.accentColor};">${member.avatar}</span>
        </div>
        <div class="team-accent-dot" style="background:${member.accentColor};"></div>
      </div>
      <div class="team-info">
        <h3 class="team-name">${member.name}</h3>
        <p class="team-role" style="color:${member.accentColor};">${member.role}</p>
        <p class="team-bio">${member.bio}</p>
        <div class="team-links">
          <a href="${member.linkedin}" class="team-social" aria-label="${member.name} on LinkedIn" style="--link-color:${member.accentColor}">in</a>
          <a href="${member.twitter}" class="team-social" aria-label="${member.name} on Twitter" style="--link-color:${member.accentColor}">𝕏</a>
        </div>
      </div>
    </article>`).join("");
}

// ── Footer ─────────────────────────────────────────────────

function renderFooter() {
  const year = dom.footerYear();
  if (year) year.textContent = SITE_CONFIG.year;

  const cols = dom.footerColumns();
  if (cols) {
    cols.innerHTML = FOOTER_CONFIG.columns.map(col => `
      <div class="footer-col">
        <h4 class="footer-col-title">${col.title}</h4>
        <ul class="footer-col-links">
          ${col.links.map(link => `<li><a href="#" class="footer-link">${link}</a></li>`).join("")}
        </ul>
      </div>`).join("");
  }

  const social = dom.footerSocial();
  if (social) {
    social.innerHTML = FOOTER_CONFIG.social.map(s =>
      `<a href="${s.url}" class="footer-social-link" aria-label="${s.name}">${s.icon}</a>`
    ).join("");
  }

  const legal = dom.footerLegal();
  if (legal) {
    legal.innerHTML = FOOTER_CONFIG.legalLinks.map(l =>
      `<a href="#" class="footer-legal-link">${l}</a>`
    ).join("");
  }
}

// ── Hero ───────────────────────────────────────────────────

function initHero() {
  // Title/subtitle already set in HTML; hero image not needed for bright theme
}

// ── Scroll Animations ──────────────────────────────────────

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".team-card, .section-header").forEach(el => observer.observe(el));
}

// ── Pills ──────────────────────────────────────────────────

function initUserTypePills() {
  dom.userTypePills().forEach(pill => {
    pill.addEventListener("click", () => {
      const type = pill.dataset.type;
      const mode = pill.dataset.mode || "login";
      if (type) openModal(type, mode);
    });
  });
}

// ── Modal Close ────────────────────────────────────────────

function initModalClose() {
  dom.modalOverlay().addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && state.modalOpen) closeModal(); });
  document.getElementById("modal-close").addEventListener("click", closeModal);
  dom.tabLogin().addEventListener("click", () => switchAuthMode("login"));
  dom.tabRegister().addEventListener("click", () => switchAuthMode("register"));
}

// ── Navbar ─────────────────────────────────────────────────

function initNavbar() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 40));

  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
  }
}

// ── Boot ───────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  renderFooter();
  initUserTypePills();
  initModalClose();
  initNavbar();
  setTimeout(initScrollAnimations, 100);

  // Boot analytics (loaded from analytics.js)
  if (typeof Analytics !== "undefined") {
    Analytics.init();
  }
});
