// Smooth internal scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href');
    if(!id || id === '#') return;
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    // collapse mobile drawer if open
    const navToggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (navToggle && links && window.getComputedStyle(navToggle).display !== 'none') {
      navToggle.setAttribute('aria-expanded','false');
      links.classList.remove('open');
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
if (navToggle && navLinks){
  navToggle.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Modal
const modal = document.getElementById('consult-modal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal ? modal.querySelector('[data-close-modal]') : null;

openBtns.forEach(b=>b.addEventListener('click',()=>{
  if(!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}));

if (closeBtn){
  closeBtn.addEventListener('click', ()=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });
}

if (modal){
  modal.addEventListener('click', (e)=>{
    if (e.target === modal){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    }
  });
}

window.addEventListener('keydown', e=>{
  if (e.key === 'Escape' && modal && modal.classList.contains('open')){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
});
