document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-nav');

    // Crear puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);
    let currentIndex = 0;

    // Función que obtiene el ancho real del slide
    const getSlideWidth = () => slides[0].offsetWidth;

    const moveToSlide = (targetIndex) => {
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        dots[currentIndex].classList.remove('active');
        dots[targetIndex].classList.add('active');
        currentIndex = targetIndex;
    };

    // Botones
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.carousel-dot');
        if (!targetDot) return;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(targetIndex);
    });

    window.addEventListener('resize', () => moveToSlide(currentIndex));

    // 🔑 Esperar a que todas las imágenes carguen antes de ajustar la primera vez
    window.addEventListener('load', () => moveToSlide(0));
});
