// carrusel.js - Carrusel automático para sección Hero
document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const slides = document.querySelectorAll('.carousel-slide');
    const hero = document.querySelector('.hero');
    let currentSlide = 0;
    let interval;
    const slideInterval = 5000; // 5 segundos (ajustable)
    const transitionSpeed = 1500; // 1.5 segundos (debe coincidir con CSS)

    // Función para cambiar al siguiente slide
    function nextSlide() {
        // Remueve clases del slide actual
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        // Calcula el siguiente slide (con loop)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Activa el nuevo slide
        slides[currentSlide].classList.add('active');
        
        // Limpia la clase 'prev' después de la animación
        setTimeout(() => {
            document.querySelectorAll('.carousel-slide.prev').forEach(slide => {
                slide.classList.remove('prev');
            });
        }, transitionSpeed);
    }

    // Inicia el carrusel automático
    function startCarousel() {
        interval = setInterval(nextSlide, slideInterval);
    }

    // Pausa el carrusel (opcional al hacer hover)
    function pauseCarousel() {
        clearInterval(interval);
    }

    // Inicialización
    if (slides.length > 0) {
        // Activa el primer slide
        slides[0].classList.add('active');
        
        // Inicia el carrusel
        startCarousel();
        
        // Pausa al interactuar (opcional)
        hero.addEventListener('mouseenter', pauseCarousel);
        hero.addEventListener('mouseleave', startCarousel);
        hero.addEventListener('touchstart', pauseCarousel);
        hero.addEventListener('touchend', startCarousel);
    }

    // Para control manual desde otros archivos (opcional)
    window.carouselControls = {
        next: nextSlide,
        pause: pauseCarousel,
        start: startCarousel
    };
});