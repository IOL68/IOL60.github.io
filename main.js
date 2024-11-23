// Continuación de las traducciones
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

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Language selector event listener
langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    updateLanguage(lang);
});

// Initialize with Spanish
updateLanguage('es');

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

// Floating book button visibility
const floatingButton = document.querySelector('.fixed.bottom-6.right-6');
if (floatingButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingButton.classList.remove('opacity-0');
            floatingButton.classList.add('opacity-100');
        } else {
            floatingButton.classList.add('opacity-0');
            floatingButton.classList.remove('opacity-100');
        }
    });
}

// Experience cards hover effect
const cards = document.querySelectorAll('.experience-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize current year in footer
document.querySelector('.text-gray-400 p').textContent = 
    `© ${new Date().getFullYear()} Camino al Sol. Todos los derechos reservados.`;

// Form validation for booking buttons
document.querySelectorAll('button:contains("¡RESERVA YA!")').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para el proceso de reserva
        alert('¡Gracias por tu interés! Pronto te contactaremos para confirmar tu reserva.');
    });
});

// Add intersection observer for animations
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add preload for images
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
});

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí puedes agregar la validación del formulario
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
    });
});

// Manejar errores de carga de imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'assets/placeholder.jpg'; // Imagen de respaldo
    });
});