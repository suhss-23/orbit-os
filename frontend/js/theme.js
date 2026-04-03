// frontend/js/theme.js

document.addEventListener('DOMContentLoaded', () => {

    // Load saved theme from localStorage or default to blue
    const savedTheme = localStorage.getItem('orbit-theme') || 'blue';
    applyTheme(savedTheme);

    // Taskbar clock
    const clockEl = document.getElementById('taskbarClock');
    if (clockEl) {
        function updateClock() {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            clockEl.textContent = `${h}:${m}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
});

function applyTheme(name) {
    // Apply to body
    document.body.setAttribute('data-theme', name);

    // Save to localStorage so it persists across all pages
    localStorage.setItem('orbit-theme', name);
}