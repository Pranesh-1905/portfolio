const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
} else {
    console.log('Theme toggle element not found. Theme switching disabled.');
}