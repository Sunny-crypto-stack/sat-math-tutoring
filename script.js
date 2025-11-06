// ====== Nav behavior ======
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
const drawer = document.getElementById('drawer');

function setNavState() {
  if (window.scrollY > 16) nav.classList.add('opaque');
  else nav.classList.remove('opaque');
}
setNavState();
window.addEventListener('scroll', setNavState, { passive: true });

// mobile drawer
if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// ====== Progress bar ======
const progress = document.getElementById('progress-tracker');
function updateProgress() {
  if (!progress) return;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = height > 0 ? (window.scrollY / height) * 100 : 0;
  progress.style.width = scrolled + '%';
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

// ====== Reveal on scroll ======
function reveal() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('load', reveal);
window.addEventListener('scroll', reveal, { passive: true });

// ====== Ambient cursor parallax ======
const ambient = document.getElementById('ambient');
window.addEventListener('pointermove', (e) => {
  if (!ambient) return;
  const mx = (e.clientX / window.innerWidth) * 100;
  const my = (e.clientY / window.innerHeight) * 100;
  ambient.style.setProperty('--mx', `${mx}%`);
  ambient.style.setProperty('--my', `${my}%`);
}, { passive: true });

// ====== Modal ======
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');

function openModal() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  const first = modal.querySelector('button, [href], input, textarea, select');
  if (first) first.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

openButtons.forEach(b => b.addEventListener('click', openModal));
closeButtons.forEach(b => b.addEventListener('click', closeModal));
if (modal) {
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
