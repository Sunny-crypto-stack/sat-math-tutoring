// ====== NAV OPACITY ON SCROLL ======
const nav = document.getElementById('site-nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 12) {
    nav.classList.add('opaque');
    nav.classList.remove('transparent');
  } else {
    nav.classList.add('transparent');
    nav.classList.remove('opaque');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ====== MOBILE NAV TOGGLE ======
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close menu on link click (mobile)
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// ====== SMOOTH SCROLL WITH OFFSET ======
const offsetScrollTo = (target) => {
  const navH = nav ? nav.getBoundingClientRect().height : 0;
  const y = target.getBoundingClientRect().top + window.scrollY - (navH + 12);
  window.scrollTo({ top: y, behavior: 'smooth' });
};

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    offsetScrollTo(el);
  });
});

// ====== CONSULT MODAL ======
const modal = document.getElementById('consult-modal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtns = document.querySelectorAll('[data-close-modal]');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  const first = modal.querySelector('button, a, input, textarea');
  if (first) first.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

openBtns.forEach(btn => btn.addEventListener('click', openModal));
closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
