const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-links');

// Shrink nav on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('nav-shrink');
    } else {
        nav.classList.remove('nav-shrink');
    }
});

// Active section highlighting
const observerOptions = {
    threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Mobile menu toggle
burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
});