// frontend/js/omnibar.js
document.addEventListener("DOMContentLoaded", () => {
    const omnibar = document.getElementById('omnibarInput');

    // Ctrl+K Shortcut to focus the search bar
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault(); // Prevent browser search from opening
            omnibar.focus();
        }
    });

    // Handle Enter keypress
    omnibar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = omnibar.value.trim().toLowerCase();
            console.log(`Executing command: ${command}`);
            
            // Basic Phase 1 command handling
            if (command.startsWith('set theme ')) {
                const theme = command.split(' ')[2];
                if (['purple', 'blue', 'green', 'red'].includes(theme)) {
                    document.body.setAttribute('data-theme', theme);
                }
            }
            
            // Clear input after execution
            omnibar.value = '';
            omnibar.blur();
        }
    });
});