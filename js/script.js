// Animación del menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.classList.toggle('active');
    
    // Animación suave al cerrar
    if (!navMenu.classList.contains('show')) {
        navMenu.style.transition = 'all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1)';
    }
});

// Cerrar menú al hacer clic en un enlace (mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
});