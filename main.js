/**
 * Portfolio Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // -------------------------
    // CUSTOM DRAG CURSOR
    // -------------------------
    const cursor = document.getElementById('cursor');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isMouseMoving = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isMouseMoving) {
            cursorX = mouseX;
            cursorY = mouseY;
            isMouseMoving = true;
            handleScroll();
        }
    });

    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    function animateCursor() {
        const factor = 0.1;
        cursorX += (mouseX - cursorX) * factor;
        cursorY += (mouseY - cursorY) * factor;
        cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // -------------------------
    // NAVBAR ACTIVE STATE
    // -------------------------
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');
    const aboutSection = document.getElementById('about');

    function handleScroll() {
        if (aboutSection && aboutSection.getBoundingClientRect().top <= 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (current === 'projects') {
            document.body.style.cursor = 'none';
            if (isMouseMoving) cursor.style.opacity = 1;
        } else {
            document.body.style.cursor = 'auto';
            cursor.style.opacity = 0;
        }

        // Animate skill bars if skills section in view
        if (current === 'skills') {
            document.querySelectorAll('.skill-bar').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // -------------------------
    // SCROLL ENTRANCE ANIMATIONS
    // -------------------------
    const animatedSections = document.querySelectorAll('#home, #about, #projects, #skills, #contact');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.15 });

    animatedSections.forEach(section => observer.observe(section));
}
