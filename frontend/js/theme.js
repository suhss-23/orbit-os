// frontend/js/theme.js
document.addEventListener("DOMContentLoaded", () => {
    const themeDots = document.querySelectorAll('.theme-dot');
    
    themeDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const selectedTheme = e.target.getAttribute('data-theme');
            // Changes the data-theme attribute on the body, which updates CSS variables
            document.body.setAttribute('data-theme', selectedTheme);
        });
    });

    // Initialize the Taskbar Clock
    const clockElement = document.getElementById('taskbarClock');
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});