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

window.addEventListener('load', function() {
            const carousel = document.getElementById('productCarousel');
            const items = carousel.querySelectorAll('.carousel-item');
            const prevBtn = document.getElementById('carouselPrev');
            const nextBtn = document.getElementById('carouselNext');
            let current = 0;
            let autoAdvance = true;
            let isAnimating = false;
            function updateCarousel() {
                if (isAnimating) return;
                isAnimating = true;
                carousel.style.transform = `translateX(-${current * 100}%)`;
                setTimeout(() => { isAnimating = false; }, 400);
            }
            prevBtn.addEventListener('click', () => {
                current = (current - 1 + items.length) % items.length;
                updateCarousel();
                autoAdvance = false;
            });
            nextBtn.addEventListener('click', () => {
                current = (current + 1) % items.length;
                updateCarousel();
                autoAdvance = false;
            });
            setInterval(() => {
                if (autoAdvance && !isAnimating) {
                current = (current + 1) % items.length;
                updateCarousel();
                }
            }, 5000);
            updateCarousel();
});