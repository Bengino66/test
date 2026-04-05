const menuBtn = document.querySelector('.bx-menu'); // Your hamburger icon
const closeBtn = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Open Menu
menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
});

// Close Menu
closeBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
});