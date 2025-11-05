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
