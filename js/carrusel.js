// Carrusel automático optimizado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const slides = document.querySelectorAll('.carousel-slide');
    const hero = document.querySelector('.hero');
    if (!slides.length) return;

    // Configuración
    let currentSlide = 0;
    let interval;
    const slideInterval = 5000;
    const transitionSpeed = 1500;

    // Precarga eficiente de imágenes
    function preloadImages() {
        const images = [
            'assets/img/fondo-hero-1.webp',
            'assets/img/fondo-hero-2.webp',
            'assets/img/fondo-hero-3.webp',
            'assets/img/fondo-hero-4.webp'
        ];
        
        images.forEach(src => {
            new Image().src = src;
        });
    }
    preloadImages();

    // Actualiza indicadores visuales
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Navegación entre slides
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        updateIndicators();
        
        // Limpieza después de la transición
        setTimeout(() => {
            document.querySelectorAll('.carousel-slide.prev').forEach(slide => {
                slide.classList.remove('prev');
            });
        }, transitionSpeed);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Crea controles de navegación
    function createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-controls';
        
        slides.forEach((_, i) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            indicator.addEventListener('click', () => {
                pauseCarousel();
                goToSlide(i);
                startCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        hero.appendChild(indicatorsContainer);
        updateIndicators();
    }

    // Control del carrusel automático
    function startCarousel() {
        clearInterval(interval);
        interval = setInterval(nextSlide, slideInterval);
    }

    function pauseCarousel() {
        clearInterval(interval);
    }

    // Eventos de interacción
    function setupEventListeners() {
        hero.addEventListener('mouseenter', pauseCarousel);
        hero.addEventListener('mouseleave', startCarousel);
        hero.addEventListener('touchstart', pauseCarousel);
        hero.addEventListener('touchend', startCarousel);
    }

    // Inicialización
    slides[0].classList.add('active');
    createIndicators();
    startCarousel();
    setupEventListeners();

    // API pública (opcional)
    window.carouselAPI = {
        next: nextSlide,
        prev: () => goToSlide(currentSlide - 1),
        pause: pauseCarousel,
        start: startCarousel
    };
});