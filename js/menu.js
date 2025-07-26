// Menú hamburguesa accesible y optimizado
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (!menuToggle || !navMenu) return;

    // Configuración inicial ARIA
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menú principal');
    menuToggle.setAttribute('aria-controls', 'main-menu');

    // Estado del menú
    let isMenuOpen = false;

    // Alternar menú
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('show');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            const firstLink = navMenu.querySelector('a');
            firstLink.focus();
        } else {
            document.body.style.overflow = '';
            menuToggle.focus();
        }
    }

    // Cerrar menú al hacer clic en enlace (mobile)
    function closeMenuOnLinkClick() {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 810) {
                    e.preventDefault();
                    toggleMenu();
                    
                    // Navegación suave después de cerrar el menú
                    setTimeout(() => {
                        const target = document.querySelector(link.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 300);
                }
            });
        });
    }

    // Lightbox para galería
    function initLightbox() {
        document.querySelectorAll('.galeria-item img').forEach(img => {
            img.addEventListener('click', () => {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <span class="close-lightbox" tabindex="0" aria-label="Cerrar">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                `;
                document.body.appendChild(lightbox);
                
                // Cerrar con tecla ESC
                lightbox.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') lightbox.remove();
                });
                
                // Cerrar al hacer clic
                lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                    lightbox.remove();
                });
            });
        });
    }

    // Navegación suave general
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (href !== '#!' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) toggleMenu();
    });

    // Inicialización
    closeMenuOnLinkClick();
    initLightbox();
    setupSmoothScrolling();
});

// Animación de cards de candidatos
function toggleInfo(card) {
    // Verifica si el click fue en el botón "Volver"
    if (event.target.classList.contains('btn-vermas')) {
        event.stopPropagation();
    }
    
    // Cierra otras cards abiertas
    document.querySelectorAll('.miembro-card').forEach(item => {
        if (item !== card) item.classList.remove('active');
    });
    
    // Alterna la card actual
    card.classList.toggle('active');
    
    // Focus management para accesibilidad
    if (card.classList.contains('active')) {
        const firstInteractive = card.querySelector('button, a');
        if (firstInteractive) firstInteractive.focus();
    }
}

// Hacer cards accesibles por teclado
document.querySelectorAll('.miembro-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') toggleInfo(card);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const menuContainer = document.querySelector('nav'); // Contenedor del menú

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
            document.body.style.overflow = ''; // Restaura el scroll
        }
    });

    // Tu código existente del toggle...
});

// Modifica tu event listener para cerrar al hacer scroll
window.addEventListener('scroll', function() {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});