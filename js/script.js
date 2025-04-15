const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navbar.classList.toggle('menu-open');
    burger.classList.toggle('open');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});