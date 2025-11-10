/* =============== FocusPrep interactions =============== */

const nav = document.getElementById('site-nav');
const progress = document.getElementById('progress-bar');
const mobileBtn = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const ambient = document.getElementById('ambient');

/* Solidify nav on scroll + progress bar */
const onScroll = () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 24) nav.classList.add('opaque');
  else nav.classList.remove('opaque');

  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.max(0, Math.min(1, height ? y / height : 0));
  progress.style.width = (pct * 100).toFixed(2) + '%';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile menu */
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    const open = mobileMenu.hasAttribute('hidden') === false;
    if (open) {
      mobileMenu.setAttribute('hidden', '');
      mobileBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.removeAttribute('hidden');
      mobileBtn.setAttribute('aria-expanded', 'true');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.setAttribute('hidden', '');
      mobileBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

/* Smooth anchor scroll with header offset */
function offsetScrollTo(id) {
  const target = document.querySelector(id);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const y = rect.top + window.scrollY - 84; // header height offset
  window.scrollTo({ top: y, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.length <= 1) return;
    e.preventDefault();
    offsetScrollTo(href);
    history.pushState(null, '', href);
  });
});

/* Reveal-on-scroll */
function reveal() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal, { passive: true });
window.addEventListener('load', reveal);

/* Cursor-reactive ambient */
window.addEventListener('pointermove', e => {
  if (!ambient) return;
  const cx = (e.clientX / window.innerWidth - 0.5) * 8;
  const cy = (e.clientY / window.innerHeight - 0.5) * 8;
  ambient.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
});
