/* Progress */
const bar = document.getElementById('progress-bar');
function tick() {
  if(!bar) return;
  const h = document.documentElement.scrollHeight - innerHeight;
  const p = h > 0 ? (scrollY / h) * 100 : 0;
  bar.style.width = p + '%';
}
addEventListener('scroll', tick, {passive:true});
addEventListener('load', tick);

/* Nav translucency */
const nav = document.querySelector('.nav');
function setNav() {
  if(!nav) return;
  if (scrollY > 12) nav.classList.add('opaque'), nav.classList.remove('transparent');
  else nav.classList.add('transparent'), nav.classList.remove('opaque');
}
addEventListener('scroll', setNav, {passive:true});
addEventListener('load', setNav);

/* Mobile menu */
const toggle = document.querySelector('.nav-toggle');
const drawer = document.getElementById('mobile-menu');
if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    drawer.hidden = expanded;
  });
}

/* Smooth in-page scroll (works across pages with #hash) */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"], a[href*="index.html#"]');
  if (!a) return;

  // determine target id
  let hash = '';
  try {
    const url = new URL(a.href, location.href);
    hash = url.hash;
  } catch { hash = a.getAttribute('href').replace(/^.*#/, '#'); }

  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({behavior:'smooth', block:'start'});
});

/* Reveal-on-scroll (optional) */
const revealAll = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight - 80) el.classList.add('visible');
  });
};
addEventListener('scroll', revealAll, {passive:true});
addEventListener('load', revealAll);

/* Ambient subtle parallax */
const ambient = document.getElementById('ambient');
addEventListener('mousemove', (e) => {
  if(!ambient) return;
  const x = (e.clientX / innerWidth - .5) * 6;
  const y = (e.clientY / innerHeight - .5) * 6;
  ambient.style.transform = `translate(${x}px, ${y}px)`;
});
