const statsSection = document.querySelector('#experiencia');
const numbers = statsSection.querySelectorAll('h2, h3');
let animated = false;

function animateNumber(element) {
    const text = element.innerText.trim();

    // Extraer número y sufijo (+ o %)
    const value = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');

    let current = 0;
    const duration = 4000; // ms (más alto = más lento)
    const increment = value / (duration / 16);

    function update() {
        current += increment;

        if (current < value) {
            element.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(update);
        } else {
            element.innerText = value + suffix;
        }
    }

    element.innerText = '0' + suffix;
    update();
}

// Observer para detectar cuando entra en pantalla
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                numbers.forEach(num => animateNumber(num));
                animated = true; // se ejecuta solo una vez
            }
        });
    },
    { threshold: 0.4 }
);

observer.observe(statsSection);

// ======================
// ANIMAR SECCIONES AL HACER SCROLL
// ======================
const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // añadir clase visible
                entry.target.classList.add('visible');

                // si es sección experiencia, animar contadores
                if (entry.target.id === 'experiencia' && !countersAnimated) {
                    numbers.forEach(num => animateNumber(num));
                    countersAnimated = true;
                }

                // dejar de observar esta sección
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 } // cuando el 20% de la sección es visible
);

// observar todas las secciones
allSections.forEach(section => sectionObserver.observe(section));