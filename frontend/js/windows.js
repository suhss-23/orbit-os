// frontend/js/windows.js

document.addEventListener('DOMContentLoaded', () => {
    const windowContainer = document.getElementById('windowContainer');
    let topZIndex = 100;

    // Listen for app orb clicks from orbit.js
    document.addEventListener('openApp', (e) => {
        createWindow(e.detail.id, e.detail.icon, e.detail.name);
    });

    window.createWindow = function(id, icon, title) {
        // If window already open, just bring it to front
        const existing = document.getElementById(`win-${id}`);
        if (existing) {
            bringToFront(existing);
            restoreWindow(existing);
            return;
        }

        topZIndex++;

        const win = document.createElement('div');
        win.className = 'os-window';
        win.id = `win-${id}`;
        win.style.zIndex = topZIndex;

        win.innerHTML = `
            <div class="window-header">
                <div class="window-title">${icon} ${title}</div>
                <div class="window-controls">
                    <button class="win-btn btn-min"  title="Minimize"></button>
                    <button class="win-btn btn-max"  title="Maximize"></button>
                    <button class="win-btn btn-close" title="Close"></button>
                </div>
            </div>
            <div class="window-content">
                <p style="opacity:0.5;">
                    ${title} — content coming in a future phase.
                </p>
            </div>
        `;

        windowContainer.appendChild(win);
        setupWindowBehavior(win, id);
    };

    function bringToFront(win) {
        topZIndex++;
        win.style.zIndex = topZIndex;
    }

    function restoreWindow(win) {
        win.classList.remove('minimized');
    }

    function setupWindowBehavior(win, id) {
        const header   = win.querySelector('.window-header');
        const closeBtn = win.querySelector('.btn-close');
        const minBtn   = win.querySelector('.btn-min');
        const maxBtn   = win.querySelector('.btn-max');

        // Bring to front on click
        win.addEventListener('mousedown', () => {
            bringToFront(win);
        });

        // Close
        closeBtn.addEventListener('click', () => {
            win.style.opacity = '0';
            win.style.transform = 'scale(0.95)';
            win.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            setTimeout(() => win.remove(), 200);
        });

        // Minimize — hides the window but keeps it in DOM
        minBtn.addEventListener('click', () => {
            win.classList.toggle('minimized');
        });

        // Maximize — toggle fullscreen size
        let isMaximized = false;
        let prevStyle = {};

        maxBtn.addEventListener('click', () => {
            if (!isMaximized) {
                // Save current position and size before maximizing
                prevStyle = {
                    width:  win.style.width,
                    height: win.style.height,
                    top:    win.style.top,
                    left:   win.style.left,
                };
                win.style.width  = '100vw';
                win.style.height = 'calc(100vh - 80px)';
                win.style.top    = '0';
                win.style.left   = '0';
                win.style.borderRadius = '0';
                isMaximized = true;
            } else {
                // Restore previous size and position
                win.style.width  = prevStyle.width  || '600px';
                win.style.height = prevStyle.height || '400px';
                win.style.top    = prevStyle.top    || '20%';
                win.style.left   = prevStyle.left   || '20%';
                win.style.borderRadius = '12px';
                isMaximized = false;
            }
        });

        // Drag with snap to grid
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('win-btn')) return;
            if (isMaximized) return;
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            bringToFront(win);
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
            win.style.top  = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // 3D tilt effect
        win.addEventListener('mousemove', (e) => {
            if (isDragging || isMaximized) return;
            const rect    = win.getBoundingClientRect();
            const x       = e.clientX - rect.left;
            const y       = e.clientY - rect.top;
            const centerX = rect.width  / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) *  2;
            win.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        win.addEventListener('mouseleave', () => {
            if (isMaximized) return;
            win.style.transition = 'transform 0.3s ease';
            win.style.transform  = 'rotateX(0deg) rotateY(0deg)';
            setTimeout(() => { win.style.transition = ''; }, 300);
        });
    }
});