// Navbar opacity transitions
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const opacityValue = window.scrollY / 200;
    navbar.style.opacity = Math.min(opacityValue + 0.5, 1);
});

// Dark/light mode toggle
const toggleButton = document.querySelector('#toggle-mode');
toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Scroll-based progress bar
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', function() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Modal animations
const modal = document.querySelector('.modal');
const modalOpenButton = document.querySelector('#open-modal');
const modalCloseButton = document.querySelector('#close-modal');

modalOpenButton.addEventListener('click', function() {
    modal.classList.add('show');
});
modalCloseButton.addEventListener('click', function() {
    modal.classList.remove('show');
});

// Course card entrance animations
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach((card) => {
    card.classList.add('animate');
});