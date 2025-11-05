const modal = document.querySelector('.consult-modal');
const modalCard = modal ? modal.querySelector('.modal-card') : null;
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  if (modalCard) {
    modalCard.setAttribute('tabindex', '-1');
    modalCard.focus();
  }
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

openModalButtons.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

closeModalButtons.forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 32) navbar.classList.add('opaque');
  else navbar.classList.remove('opaque');
});

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

const revealOnScroll = () => {
  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
    else el.classList.remove('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const modal = document.querySelector('.consult-modal') || document.querySelector('.sourcing-modal');
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalTriggers = document.querySelectorAll('[data-close-modal]');

openModalButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const firstField = modal.querySelector('input, textarea, button');
    if (firstField instanceof HTMLElement) firstField.focus();
  });
});

closeModalTriggers.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

const modalForm = document.querySelector('.modal-form');
if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! A Sunnypreps mentor will reach out within 48 hours.');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
}
