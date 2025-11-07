// Modal
const modal=document.querySelector('.consult-modal');
const openBtns=document.querySelectorAll('[data-open-modal]');
const closeBtns=document.querySelectorAll('[data-close-modal]');
function openModal(){modal.classList.add('open');}
function closeModal(){modal.classList.remove('open');}
openBtns.forEach(b=>b.addEventListener('click',openModal));
closeBtns.forEach(b=>b.addEventListener('click',closeModal));
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});

// Progress bar
const progress=document.getElementById('progress-tracker');
window.addEventListener('scroll',()=>{
  const scrollTop=window.scrollY;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  const scrolled=(scrollTop/docHeight)*100;
  progress.style.width=scrolled+'%';
});

// Ambient movement
const ambient=document.getElementById('ambient');
window.addEventListener('pointermove',e=>{
  const x=(e.clientX/window.innerWidth-0.5)*8;
  const y=(e.clientY/window.innerHeight-0.5)*8;
  ambient.style.transform=`rotateX(${y}deg) rotateY(${-x}deg)`;
});
