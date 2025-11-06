const modal = document.querySelector('.consult-modal');
const modalCard = modal?.querySelector('.modal-card');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtns = document.querySelectorAll('[data-close-modal]');

function openModal() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  modalCard?.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}

openBtns.forEach(btn => btn.addEventListener('click', openModal));
closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
window.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
modal?.addEventListener('click', e => { if(e.target===modal) closeModal(); });

/* Scroll progress */
const progress = document.getElementById('progress-tracker');
function updateProgress(){
  const h=document.documentElement.scrollHeight-window.innerHeight;
  const pct=h>0?(window.scrollY/h)*100:0;
  progress.style.width=pct+'%';
}
window.addEventListener('scroll',updateProgress);

/* Nav scroll behavior */
const nav=document.getElementById('nav');
function setNavState(){
  if(window.scrollY>20) nav.classList.add('opaque');
  else nav.classList.remove('opaque');
}
window.addEventListener('scroll',setNavState);

/* Ambient rotation */
const ambient=document.getElementById('ambient');
window.addEventListener('pointermove',e=>{
  if(!ambient)return;
  const x=(e.clientX/window.innerWidth-0.5)*6;
  const y=(e.clientY/window.innerHeight-0.5)*6;
  ambient.style.transform=`rotateX(${y}deg) rotateY(${-x}deg)`;
});
