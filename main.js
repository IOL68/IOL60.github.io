// Configuración inicial
const REPO_PATH = '/60';
const DOMAIN_PATH = '/caminoalsol.github.io';

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

// Traducciones
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

// Función para manejar imágenes generales
function initializeImages() {
    const images = document.querySelectorAll('img:not(.experience-card img)');
    
    images.forEach(img => {
        const originalSrc = img.getAttribute('src');
        if (!originalSrc.includes('/60/') && !originalSrc.includes('placeholder')) {
            img.src = `${REPO_PATH}/${originalSrc.replace(/^\//, '')}`;
        }
        
        img.onerror = function() {
            console.error('Error al cargar imagen:', this.src);
            if (!this.src.includes('placeholder')) {
                this.src = '/api/placeholder/400/320';
            }
        };
    });
}

// Función específica para las imágenes de las cards
function initializeCardImages() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        if (!img) return;

        const originalSrc = img.getAttribute('src');
        console.log(`Inicializando imagen de card ${index + 1}:`, originalSrc);

        // Crear contenedor de carga
        const loadingContainer = document.createElement('div');
        loadingContainer.className = 'absolute inset-0 bg-gray-200 animate-pulse';
        img.parentNode.insertBefore(loadingContainer, img);

        // Preparar rutas posibles
        const tryPaths = [
            originalSrc,
            `/60/${originalSrc}`,
            `/60/assets/${originalSrc.split('/').pop()}`,
            `/assets/${originalSrc.split('/').pop()}`,
            originalSrc.replace('assets/', '/60/assets/')
        ];

        // Función para probar cada ruta
        const tryLoadImage = async () => {
            for (let path of tryPaths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        console.log('Imagen encontrada en:', path);
                        img.src = path;
                        return true;
                    }
                } catch (error) {
                    console.log('Fallo al intentar ruta:', path);
                }
            }
            return false;
        };

        // Configurar imagen
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';

        img.onload = function() {
            console.log('Imagen cargada:', this.src);
            loadingContainer.remove();
            this.style.opacity = '1';
        };

        img.onerror = function() {
            console.error('Error al cargar:', this.src);
            if (!this.src.includes('placeholder')) {
                loadingContainer.remove();
                this.src = '/api/placeholder/400/320';
                this.style.opacity = '1';
            }
        };

        // Intentar cargar la imagen
        tryLoadImage().catch(error => {
            console.error('Error en la carga:', error);
            img.src = '/api/placeholder/400/320';
        });
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

// Función de diagnóstico
function diagnoseCardImages() {
    console.log('=== DIAGNÓSTICO DE IMÁGENES EN CARDS ===');
    const cards = document.querySelectorAll('.experience-card img');
    
    cards.forEach((img, index) => {
        console.log(`Card ${index + 1}:`, {
            src: img.getAttribute('src'),
            currentSrc: img.currentSrc,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete,
            offsetParent: img.offsetParent !== null,
            visible: window.getComputedStyle(img).display !== 'none',
            opacity: window.getComputedStyle(img).opacity
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar imágenes
    initializeImages();
    initializeCardImages();
    
    // Diagnóstico después de un breve retraso
    setTimeout(diagnoseCardImages, 1000);

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
const langSelect = document.getElementById('langSelect');
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

// Event listener para el scroll
window.addEventListener('scroll', handleHeaderScroll);

// Observer para animaciones
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

// Ejecutar handleHeaderScroll una vez al cargar
handleHeaderScroll();
