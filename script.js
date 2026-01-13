// ======================
// NAVIGATION MOBILE
// ======================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ======================
// NAVBAR SCROLL EFFECT
// ======================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(10, 22, 40, 0.95)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(10, 22, 40, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// ======================
// INTERSECTION OBSERVER
// ======================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in-up
const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach(el => {
    observer.observe(el);
});

// ======================
// SMOOTH SCROLL AVEC OFFSET
// ======================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======================
// ACTIVE NAVIGATION LINK
// ======================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--white)';
            } else {
                navLink.style.color = 'var(--gray)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ======================
// PARALLAX EFFECT ON HERO
// ======================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / 800);
    }
});

// ======================
// DYNAMIC YEAR IN FOOTER
// ======================

const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Naroulougo Guessonguilé – All rights reserved`;
}

// ======================
// LOADING ANIMATION
// ======================

window.addEventListener('load', () => {
    document.body.style.overflow = 'visible';
    
    // Animer les éléments du hero immédiatement
    const heroElements = document.querySelectorAll('.hero .fade-in, .hero .fade-in-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ======================
// PERFORMANCE OPTIMIZATIONS
// ======================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Appliquer debounce aux événements scroll
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}, 10));

// ======================
// DOWNLOAD CV BUTTON
// ======================

const downloadButtons = document.querySelectorAll('.btn-download, .btn-secondary');
downloadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Afficher un message (à personnaliser)
        const message = document.createElement('div');
        message.className = 'download-message';
        message.textContent = 'Fonctionnalité de téléchargement à configurer avec votre CV';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--blue);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            z-index: 9999;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => message.remove(), 300);
        }, 3000);
        
        // Ici, vous pouvez ajouter le lien vers votre CV
        // window.open('chemin/vers/votre-cv.pdf', '_blank');
    });
});

// ======================
// ANIMATIONS CSS
// ======================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

console.log('🚀 Site web de Naroulougo Guessonguilé chargé avec succès!');
