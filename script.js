// Smooth scroll + nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Mobile nav
const toggle=document.querySelector('.nav-toggle');
const menu=document.querySelector('#mobile-menu');
toggle.addEventListener('click',()=>{
  const expanded=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',!expanded);
  menu.hidden=expanded;
});

// Scroll progress
window.addEventListener('scroll',()=>{
  const scrollTop=window.scrollY;
  const docHeight=document.body.scrollHeight-window.innerHeight;
  const progress=(scrollTop/docHeight)*100;
  document.getElementById('progress-bar').style.width=progress+'%';
});
