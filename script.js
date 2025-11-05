/*
  sunnypreps. interaction layer
  - Handles responsive navigation
  - Controls consultation modal
  - Animates sections on scroll
  - Updates ambient gradient based on pointer position
  - Converts tuition prices based on visitor locale
*/

const body = document.body;
const header = document.querySelector('.site-header');
const nav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('[data-nav-toggle]');
const modal = document.querySelector('.consult-modal');
const modalCard = modal ? modal.querySelector('.modal-card') : null;
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const animatedSections = document.querySelectorAll('[data-animate]');
let idleTimeout;

const setHeaderState = () => {
  if (!header) return;
  const shouldBeSolid = window.scrollY > 12;
  header.classList.toggle('is-transparent', !shouldBeSolid);
};

const openNav = () => {
  if (!nav) return;
  nav.classList.add('is-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'true');
  }
};

const closeNav = () => {
  if (!nav) return;
  nav.classList.remove('is-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
};

const toggleNav = () => {
  if (!nav) return;
  if (nav.classList.contains('is-open')) {
    closeNav();
  } else {
    openNav();
  }
};

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

if (nav) {
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

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
  if (modalCard) {
    modalCard.removeAttribute('tabindex');
  }
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
  if (event.key === 'Escape') {
    closeModal();
    closeNav();
  }
});

// Scroll reveal animations
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add('is-visible'));
}

// Gradient responsiveness
const setIdleState = () => {
  body.classList.add('is-idle');
};

const clearIdleState = () => {
  body.classList.remove('is-idle');
  window.clearTimeout(idleTimeout);
  idleTimeout = window.setTimeout(setIdleState, 2500);
};

const updateGradient = (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  body.style.setProperty('--cursor-x', x);
  body.style.setProperty('--cursor-y', y);
  clearIdleState();
};

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', updateGradient);
  clearIdleState();
}

// Tuition conversion helper
const currencyRates = {
  USD: 1,
  EUR: 0.94,
  GBP: 0.82,
  CAD: 1.36,
  AUD: 1.56,
  INR: 83,
  JPY: 149,
};

const resolveCurrency = () => {
  const locale = navigator.language || 'en-US';
  if (locale.startsWith('en-GB')) return 'GBP';
  if (locale.startsWith('fr') || locale.startsWith('de') || locale.startsWith('es')) return 'EUR';
  if (locale.startsWith('en-CA')) return 'CAD';
  if (locale.startsWith('en-AU')) return 'AUD';
  if (locale.startsWith('hi') || locale.startsWith('en-IN')) return 'INR';
  if (locale.startsWith('ja')) return 'JPY';
  return 'USD';
};

const applyCurrencyConversion = () => {
  const currency = resolveCurrency();
  const rate = currencyRates[currency] || 1;
  const locale = navigator.language || 'en-US';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: ['JPY', 'INR'].includes(currency) ? 0 : 2,
  });

  document.querySelectorAll('.price[data-usd]').forEach((priceEl) => {
    const usdValue = parseFloat(priceEl.getAttribute('data-usd'));
    if (Number.isNaN(usdValue)) return;
    const converted = usdValue * rate;
    priceEl.textContent = formatter.format(converted);
  });
};

applyCurrencyConversion();
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });
