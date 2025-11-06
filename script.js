/* =========================
   Core DOM handles
========================= */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

const docEl = document.documentElement;
const body  = document.body;

/* =========================
   NAVBAR: transparent → solid
========================= */
const siteNav = $("#siteNav") || $(".navbar"); // support both ids/classes
const SOLID_AT = 32;

function setHeaderState() {
  if (!siteNav) return;
  const solid = window.scrollY > SOLID_AT;
  siteNav.classList.toggle("opaque", solid);
  siteNav.classList.toggle("transparent", !solid);
}
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = $("#navToggle");
const navMenu   = $("#navMenu");
const navDrawer = $("#navDrawer");

function toggleNav(expanded) {
  if (!navToggle) return;
  const next = expanded ?? navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(next));
  if (navMenu)   navMenu.classList.toggle("hidden", !next);
  if (navDrawer) navDrawer.classList.toggle("hidden", !next);
}

if (navToggle) {
  navToggle.addEventListener("click", () => toggleNav());
  // close on route click (mobile)
  $$("#navDrawer a, #navMenu a").forEach(a =>
    a.addEventListener("click", () => toggleNav(false))
  );
}

/* =========================
   MODALS (consult / sourcing)
========================= */
const modal = $(".consult-modal") || $(".sourcing-modal");
const openModalButtons  = $$("[data-open-modal]");
const closeModalButtons = $$("[data-close-modal]");
let lastActiveElement = null;

function openModal() {
  if (!modal) return;
  lastActiveElement = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  const firstFocusable = $("input, textarea, button, [href], select", modal);
  if (firstFocusable) firstFocusable.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (lastActiveElement) lastActiveElement.focus?.();
}

openModalButtons.forEach(btn => btn.addEventListener("click", openModal));
closeModalButtons.forEach(btn => btn.addEventListener("click", closeModal));

if (modal) {
  // click outside (on backdrop or modal wrapper)
  modal.addEventListener("click", (e) => {
    const isBackdrop = e.target === modal || e.target.classList.contains("modal-bg");
    if (isBackdrop) closeModal();
  });
  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // simple demo submit handler if a form exists
  const modalForm = $(".modal-form", modal);
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! A Sunnypreps mentor will reach out within 48 hours.");
      closeModal();
    });
  }
}

/* =========================
   SCROLL REVEAL
========================= */
const revealEls = [...$$("[data-reveal]"), ...$$(".reveal")];

function setVisible(el) {
  el.classList.add("visible");
}
function setHidden(el) {
  el.classList.remove("visible");
}

if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) setVisible(target);
      else setHidden(target);
    });
  }, { rootMargin: "0px 0px -80px 0px", threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
} else {
  const revealOnScroll = () => {
    revealEls.forEach(el => {
      const r = el.getBoundingClientRect();
      (r.top < window.innerHeight - 80) ? setVisible(el) : setHidden(el);
    });
  };
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
}

/* =========================
   AMBIENT GRADIENT (cursor-reactive)
========================= */
const ambient = $("#ambient");
if (ambient) {
  const updateAmbient = (x, y) => {
    // Move/rotate softly based on cursor position
    const tx = (x / window.innerWidth  - 0.5) * 24;
    const ty = (y / window.innerHeight - 0.5) * 24;
    ambient.style.transform = `translate(${tx}px, ${ty}px) rotate(${tx * 0.3}deg)`;
    // Optional: hue shift with scroll
    const hue = (window.scrollY / (document.body.scrollHeight - innerHeight)) * 20;
    ambient.style.filter = `hue-rotate(${hue}deg)`;
  };
  window.addEventListener("mousemove", (e) => updateAmbient(e.clientX, e.clientY), { passive: true });
  window.addEventListener("scroll",  () => updateAmbient(innerWidth/2, innerHeight/2), { passive: true });
}

/* =========================
   PROGRESS TRACKER (top bar)
========================= */
const progressTracker = $("#progress-tracker");
function updateProgress() {
  if (!progressTracker) return;
  const max = docEl.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressTracker.style.width = `${pct}%`;
}
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

/* =========================
   PRICE LOCALIZATION
   Use <span class="price" data-price="199"></span>
   (Falls back to data-usd for older pages)
========================= */
const currencyRates = {
  USD: 1,
  EUR: 0.94,
  GBP: 0.82,
  CAD: 1.36,
  AUD: 1.56,
  INR: 83,
  JPY: 149,
};

function resolveCurrency() {
  const locale = navigator.language || "en-US";
  if (locale.startsWith("en-GB")) return "GBP";
  if (locale.startsWith("fr") || locale.startsWith("de") || locale.startsWith("es")) return "EUR";
  if (locale.startsWith("en-CA")) return "CAD";
  if (locale.startsWith("en-AU")) return "AUD";
  if (locale.startsWith("hi") || locale.startsWith("en-IN")) return "INR";
  if (locale.startsWith("ja")) return "JPY";
  return "USD";
}

function localizePrices() {
  const currency = resolveCurrency();
  const rate     = currencyRates[currency] || 1;
  const locale   = navigator.language || "en-US";
  const maxFrac  = (currency === "JPY" || currency === "INR") ? 0 : 2;

  const fmt = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: maxFrac
  });

  $$(".price").forEach(el => {
    const usd = parseFloat(el.getAttribute("data-price") || el.getAttribute("data-usd"));
    if (!isFinite(usd)) return;
    el.textContent = fmt.format(usd * rate);
  });
}
localizePrices();

/* =========================
   FOOTER YEAR
========================= */
const yearSpan = $("#y");
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
