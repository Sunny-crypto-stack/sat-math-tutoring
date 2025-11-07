/* ---------- Modal ---------- */
const modal = document.querySelector('.consult-modal');
const modalCard = modal?.querySelector('.modal-card');
const openModalBtns = document.querySelectorAll('[data-open-modal]');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');

function openModal() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalCard?.setAttribute('tabindex', '-1');
  modalCard?.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalCard?.removeAttribute('tabindex');
}
openModalBtns.forEach(b => b.addEventListener('click', openModal));
closeModalBtns.forEach(b => b.addEventListener('click', closeModal));
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Nav: solid on scroll + mobile drawer ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');

function setNavState() {
  if (!nav) return;
  if (window.scrollY > 24) nav.classList.add('opaque');
  else nav.classList.remove('opaque');
}
setNavState();
window.addEventListener('scroll', setNavState, { passive: true });

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navDrawer?.classList.toggle('hidden');
});

/* ---------- Scroll progress ---------- */
const progress = document.getElementById('progress-tracker');
function updateProgress() {
  if (!progress) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
  progress.style.width = pct + '%';
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

/* ---------- Reveal on scroll ---------- */
const revealEls = [...document.querySelectorAll('[data-reveal]')];
function reveal() {
  const vh = window.innerHeight;
  revealEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal, { passive: true });
window.addEventListener('load', reveal);

/* ---------- Ambient gradient reacts to cursor ---------- */
const ambient = document.getElementById('ambient');
window.addEventListener('pointermove', (e) => {
  if (!ambient) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 6;  // -3..3 deg
  const y = (e.clientY / window.innerHeight - 0.5) * 6;
  ambient.style.transform = `translateZ(0) rotateX(${y}deg) rotateY(${-x}deg)`;
});

/* ---------- Smooth anchor scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id && document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Optional: currency display helper (if you use .price[data-usd]) ---------- */
const currencyRates = { USD:1, EUR:0.94, GBP:0.82, CAD:1.36, AUD:1.56, INR:83, JPY:149 };
function resolveCurrency(){
  const locale = navigator.language || 'en-US';
  if (locale.startsWith('en-GB')) return 'GBP';
  if (locale.startsWith('fr') || locale.startsWith('de') || locale.startsWith('es')) return 'EUR';
  if (locale.startsWith('en-CA')) return 'CAD';
  if (locale.startsWith('en-AU')) return 'AUD';
  if (locale.startsWith('hi') || locale.startsWith('en-IN')) return 'INR';
  if (locale.startsWith('ja')) return 'JPY';
  return 'USD';
}
function applyCurrency(){
  const currency = resolveCurrency();
  const rate = currencyRates[currency] || 1;
  const fmt = new Intl.NumberFormat(navigator.language || 'en-US', { style:'currency', currency, maximumFractionDigits: ['JPY','INR'].includes(currency)?0:2 });
  document.querySelectorAll('.price[data-usd]').forEach(el=>{
    const usd = parseFloat(el.getAttribute('data-usd'));
    if (!isFinite(usd)) return;
    el.textContent = fmt.format(usd * rate);
  });
}
applyCurrency();
