/* filepath: /d:/Portfllio/script.js */
// Scroll to top functionality
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }
};

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
if (scrollToTopBtn) {
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}