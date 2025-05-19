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

// Product modal logic
function closeAllProductModals() {
  document.querySelectorAll('.product-modal').forEach(m => m.classList.remove('active'));
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    closeAllProductModals();
    var modalId = this.getAttribute('data-modal');
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  });
});
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', function() {
    closeAllProductModals();
  });
});
document.querySelectorAll('.product-modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeAllProductModals();
  });
});
// Product modal logic with carousel
function closeAllProductModals() {
  document.querySelectorAll('.product-modal').forEach(m => m.classList.remove('active'));
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.product-view-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    closeAllProductModals();
    var modalId = this.getAttribute('data-modal');
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      // Reset carousel to first slide
      const carousel = modal.querySelector('.modal-carousel');
      if (carousel) {
        carousel.setAttribute('data-index', '0');
        updateModalCarousel(carousel);
      }
    }
  });
});
document.querySelectorAll('.product-modal-close').forEach(btn => {
  btn.addEventListener('click', function() {
    closeAllProductModals();
  });
});
document.querySelectorAll('.product-modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeAllProductModals();
  });
});
// Carousel logic for modal
function updateModalCarousel(carousel) {
  const slides = carousel.querySelectorAll('.modal-carousel-slide');
  let idx = parseInt(carousel.getAttribute('data-index')) || 0;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  // Disable/enable buttons
  carousel.querySelector('.modal-carousel-prev').disabled = (idx === 0);
  carousel.querySelector('.modal-carousel-next').disabled = (idx === slides.length - 1);
}
document.querySelectorAll('.modal-carousel').forEach(carousel => {
  carousel.setAttribute('data-index', '0');
  updateModalCarousel(carousel);
  carousel.querySelector('.modal-carousel-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    let idx = parseInt(carousel.getAttribute('data-index')) || 0;
    if (idx > 0) {
      carousel.setAttribute('data-index', idx - 1);
      updateModalCarousel(carousel);
    }
  });
  carousel.querySelector('.modal-carousel-next').addEventListener('click', function(e) {
    e.stopPropagation();
    let idx = parseInt(carousel.getAttribute('data-index')) || 0;
    const slides = carousel.querySelectorAll('.modal-carousel-slide');
    if (idx < slides.length - 1) {
      carousel.setAttribute('data-index', idx + 1);
      updateModalCarousel(carousel);
    }
  });
});
// Prevent background scroll when modal is open
const style = document.createElement('style');
style.innerHTML = 'body.modal-open { overflow: hidden !important; }';
document.head.appendChild(style);