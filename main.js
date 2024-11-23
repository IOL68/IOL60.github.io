// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
    menuButton.innerHTML = isMenuOpen ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Language switcher
const langSelect = document.getElementById('langSelect');
const translations = {
    es: {
        inicio: 'INICIO',
        tours: 'TOURS',
        reserva: '¡RESERVA YA!',
        descubre: 'Descubre Teotihuacán desde las Alturas',
        sobreNosotros: 'Sobre Nosotros',
        contacto: 'Contacto',
        terminosCondiciones: 'Términos y Condiciones',
        politicaPrivacidad: 'Política de Privacidad',
        faq: 'FAQ'
    },
    en: {
        inicio: 'HOME',
        tours: 'TOURS',
        reserva: 'BOOK NOW!',
        descubre: 'Discover Teotihuacán from Above',
        sobreNosotros: 'About Us',
        contacto: 'Contact',
        terminosCondiciones: 'Terms and Conditions',
        politicaPrivacidad: 'Privacy Policy',
        faq: 'FAQ'
    },
    fr: {
        inicio: 'ACCUEIL',
        tours: 'CIRCUITS',
        reserva: 'RÉSERVER!',
        descubre: 'Découvrez Teotihuacán d\'en Haut',
        sobreNosotros: 'À Propos',
        contacto: 'Contact',
        terminosCondiciones: 'Termes et Conditions',
        politicaPrivacidad: 'Politique de Confidentialité',
        faq: 'FAQ'
    }
};

// Función para verificar si una imagen existe
function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Función para manejar las imágenes
async function handleImages() {
    const images = document.querySelectorAll('img');
    
    for (let img of images) {
        const originalSrc = img.getAttribute('src');
        console.log('Intentando cargar imagen:', originalSrc);

        const exists = await imageExists(originalSrc);
        
        if (!exists) {
            console.log('Imagen no encontrada:', originalSrc);
            const alternativePaths = [
                originalSrc,
                `.${originalSrc}`,
                `/${originalSrc}`,
                originalSrc.replace('assets/', '/assets/')
            ];

            for (let path of alternativePaths) {
                if (await imageExists(path)) {
                    console.log('Imagen encontrada en ruta alternativa:', path);
                    img.src = path;
                    break;
                }
            }
        }

        img.onerror = function() {
            console.error('Error al cargar la imagen:', this.src);
            if (!this.src.includes('placeholder')) {
                this.src = '/api/placeholder/400/320';
            }
        };

        img.onload = function() {
            console.log('Imagen cargada exitosamente:', this.src);
            this.style.opacity = '1';
        };
    }
}

// Inicialización de las cards de experiencia
function initExperienceCards() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        const img = card.querySelector('img');
        const loadingPlaceholder = document.createElement('div');
        loadingPlaceholder.className = 'absolute inset-0 bg-gray-200 animate-pulse';
        
        img.style.opacity = '0';
        img.parentNode.insertBefore(loadingPlaceholder, img);
        
        img.onload = () => {
            loadingPlaceholder.remove();
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.3s ease-in';
        };
        
        img.onerror = () => {
            loadingPlaceholder.remove();
            img.src = '/api/placeholder/400/320';
            img.style.opacity = '1';
        };
    });
}

// Función para actualizar el idioma
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Observador de intersección para lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Función para manejar el scroll del header
function handleHeaderScroll() {
    const header = document.getElementById('mainHeader');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar manejo de imágenes
    handleImages().catch(console.error);
    initExperienceCards();

    // Aplicar lazy loading a imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Inicializar con español
    updateLanguage('es');

    // Smooth scroll para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Validación de formularios de reserva
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('¡RESERVA YA!')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                alert('¡Gracias por tu interés! Pronto te contactaremos para confirmar tu reserva.');
            });
        }
    });
});

// Event listener para el selector de idioma
langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// Event listener para el scroll
window.addEventListener('scroll', handleHeaderScroll);

// Ejecutar handleHeaderScroll una vez al cargar
handleHeaderScroll();

// Observer para las animaciones de sección
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las secciones para animación
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
