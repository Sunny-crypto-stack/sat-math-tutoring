// Navbar opacity transition on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function(){
  if(window.scrollY > 32) navbar.classList.add('opaque');
  else navbar.classList.remove('opaque');
});

// Dark / Light Mode Toggle
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function(){
  if(root.getAttribute('data-theme') === 'dark') { root.setAttribute('data-theme','light'); }
  else { root.setAttribute('data-theme','dark'); }
});

// Progress Tracker (learning progress line fills as you scroll)
const progressTracker = document.getElementById('progress-tracker');
window.addEventListener('scroll', function(){
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / height)*100;
  progressTracker.style.width = scrolled + "%";
});

// Parallax motion for hero ambient glow
document.querySelector('.hero').addEventListener('mousemove', function(e){
  const glow = this.querySelector('.ambient-glow');
  if(glow) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    glow.style.backgroundPosition = `${50 + x*20}% ${22 + y*16}%`;
  }
});

// Modal close on Escape key
window.addEventListener('keydown', function(e){
  if(e.key === "Escape") document.querySelector('.consult-modal').classList.remove('open');
});

// Courses slide-in animation on scroll
function animateOnScroll() {
  document.querySelectorAll('.slide-in, .fade-up, .fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) el.classList.add('visible');
    else el.classList.remove('visible');
  });
}
window.addEventListener('scroll', animateOnScroll); window.addEventListener('load', animateOnScroll);

// Animate progress tracker on page load
window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{progressTracker.style.width="18%";},400);
});

// Prevent form submit (demo only for modal)
document.querySelector('.modal-card form').addEventListener('submit',function(e){
  e.preventDefault();
  alert("We'll be in touch soon. Thank you for booking!");
  document.querySelector('.consult-modal').classList.remove('open');
});
