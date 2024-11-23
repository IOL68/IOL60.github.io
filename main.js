// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('show');
            menuButton.innerHTML = '<i class="fas fa-times"></i>';
        }, 10);
    } else {
        mobileMenu.classList.remove('show');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});

// Cerrar el menú al hacer click en enlaces
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('show');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });
});

// Language switcher
const langSelect = document.getElementById('langSelect');
const mobileLangSelect = document.getElementById('mobileLangSelect');
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

// Sincronizar selectores de idioma
if (langSelect && mobileLangSelect) {
    langSelect.addEventListener('change', (e) => {
        mobileLangSelect.value = e.target.value;
        updateLanguage(e.target.value);
    });

    mobileLangSelect.addEventListener('change', (e) => {
        langSelect.value = e.target.value;
        updateLanguage(e.target.value);
    });
}

// Smooth scroll for anchor links
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

// Header scroll functionality
function handleHeaderScroll() {
    const header = document.getElementById('mainHeader');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

// Form validation for booking buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('¡RESERVA YA!')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu interés! Pronto te contactaremos para confirmar tu reserva.');
        });
    }
});

// Initialize with Spanish
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage('es');
});

// Animation observer
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

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
