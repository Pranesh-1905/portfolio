const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme toggle functionality
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