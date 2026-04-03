// frontend/js/windows.js
document.addEventListener("DOMContentLoaded", () => {
    const windowContainer = document.getElementById('windowContainer');
    let topZIndex = 100;

    // Listen for events from the app orbs (defined in orbit.js)
    document.addEventListener('openApp', (e) => {
        createWindow(e.detail.name);
    });

    // For Phase 1 testing: Add a manual click listener to the Orbs to trigger window creation
    setTimeout(() => {
        document.querySelectorAll('.app-orb').forEach(orb => {
            orb.addEventListener('click', () => {
                const appName = orb.querySelector('.app-orb-label').textContent;
                createWindow(appName);
            });
        });
    }, 500); // Wait for orbit.js to render them

    function createWindow(title) {
        topZIndex++;
        
        const win = document.createElement('div');
        win.className = 'os-window';
        win.style.zIndex = topZIndex;
        
        win.innerHTML = `
            <div class="window-header">
                <div class="window-title">${title}</div>
                <div class="window-controls">
                    <button class="win-btn btn-min"></button>
                    <button class="win-btn btn-max"></button>
                    <button class="win-btn btn-close"></button>
                </div>
            </div>
            <div class="window-content">
                <p>Welcome to ${title}. This is placeholder content for Phase 1.</p>
            </div>
        `;

        windowContainer.appendChild(win);
        setupWindowBehavior(win);
    }

    function setupWindowBehavior(win) {
        const header = win.querySelector('.window-header');
        const closeBtn = win.querySelector('.btn-close');

        // Bring to front on click
        win.addEventListener('mousedown', () => {
            topZIndex++;
            win.style.zIndex = topZIndex;
        });

        // Close window
        closeBtn.addEventListener('click', () => {
            win.remove();
        });

        // Dragging Logic with Snap to Grid
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Snap to 20px grid unless Shift is held
            if (!e.shiftKey) {
                newX = Math.round(newX / 20) * 20;
                newY = Math.round(newY / 20) * 20;
            }

            win.style.left = `${newX}px`;
            win.style.top = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // 3D Tilt Effect on mousemove over the window
        win.addEventListener('mousemove', (e) => {
            if (isDragging) return; // Don't tilt while dragging
            
            const rect = win.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 2 degrees)
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;
            
            win.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset tilt when mouse leaves
        win.addEventListener('mouseleave', () => {
            win.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }
});