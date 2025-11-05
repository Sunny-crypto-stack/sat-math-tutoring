// Navbar opacity transition on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 32) navbar.classList.add('opaque');
  else navbar.classList.remove('opaque');
});

// Dark / Light Mode Toggle
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const curr = root.getAttribute('data-theme') || 'light';
    const next = curr === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
}

// Progress Tracker (learning progress line fills as you scroll)
const progressTracker = document.getElementById('progress-tracker');
function updateProgress() {
  if (!progressTracker) return;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = height > 0 ? (window.scrollY / height) * 100 : 0;
  progressTracker.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);
window.addEventListener('DOMContentLoaded', () => {
  if (progressTracker) setTimeout(() => { progressTracker.style.width = '18%'; }, 400);
});

// Parallax motion for hero ambient glow
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const glow = hero.querySelector('.ambient-glow');
    if (!glow) return;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    glow.style.backgroundPosition = `${50 + x * 20}% ${22 + y * 16}%`;
  });
}

// Modal close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelector('.consult-modal')?.classList.remove('open');
  }
});

// Courses slide-in animation on scroll
function animateOnScroll() {
  document.querySelectorAll('.slide-in, .fade-up, .fade-in').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) el.classList.add('visible');
    else el.classList.remove('visible');
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Prevent form submit (demo only for modal)
const modalForm = document.querySelector('.modal-card form');
if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("We'll be in touch soon. Thank you for booking!");
    document.querySelector('.consult-modal')?.classList.remove('open');
  });
}
