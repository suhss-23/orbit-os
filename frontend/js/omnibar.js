// frontend/js/omnibar.js

document.addEventListener('DOMContentLoaded', () => {
    const omnibar = document.getElementById('omnibarInput');

    // Ctrl+K to focus omnibar
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            omnibar.focus();
        }
    });

    // Handle Enter
    omnibar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = omnibar.value.trim().toLowerCase();

            // Theme commands — calls applyTheme() from theme.js
            // so localStorage also gets updated
            if (command.startsWith('set theme ')) {
                const theme = command.split(' ')[2];
                if (['purple', 'blue', 'green', 'red'].includes(theme)) {
                    applyTheme(theme);
                }
            }

            omnibar.value = '';
            omnibar.blur();
        }
    });
});