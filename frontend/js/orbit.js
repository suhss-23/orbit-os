// frontend/js/orbit.js

const APPS = [
  { id: 'files',    icon: '📁', label: 'Files'    },
  { id: 'ai',       icon: '🤖', label: 'AI'       },
  { id: 'browser',  icon: '🌐', label: 'Browser'  },
  { id: 'editor',   icon: '✏️',  label: 'Editor'   },
  { id: 'system',   icon: '📊', label: 'Monitor'  },
  { id: 'settings', icon: '⚙️',  label: 'Settings' },
  { id: 'memory',   icon: '🗺️',  label: 'Memory'   },
];

const ORBIT_RADIUS = 160;

function renderOrbit() {
  const container = document.getElementById('orbitContainer');
  if (!container) return;

  // Remove old orbs before re-rendering (important on resize)
  document.querySelectorAll('.app-orb').forEach(el => el.remove());

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const total = APPS.length;

  APPS.forEach((app, i) => {
    // Calculate angle for each app evenly spaced in a circle
    // Start from top (-90 degrees = -PI/2) so first app is at 12 o'clock
    const angle = (2 * Math.PI * i) / total - Math.PI / 2;

    // Convert angle to x, y coordinates
    const x = centerX + ORBIT_RADIUS * Math.cos(angle);
    const y = centerY + ORBIT_RADIUS * Math.sin(angle);

    // Create the orb element
    const orb = document.createElement('div');
    orb.className = 'app-orb';
    orb.id = `app-${app.id}`;

    // Position it — subtract half of orb size (60px / 2 = 30px) to center it
    orb.style.left = `${x - 30}px`;
    orb.style.top  = `${y - 30}px`;

    orb.innerHTML = `
      <div class="app-orb-icon">${app.icon}</div>
      <div class="app-orb-label">${app.label}</div>
    `;

    // Open a window when clicked
    orb.addEventListener('click', () => {
      createWindow(app.id, app.icon, app.label);
    });

    container.appendChild(orb);
  });
}

// Re-render orbs when window is resized so positions stay correct
window.addEventListener('resize', renderOrbit);

// Run on page load
document.addEventListener('DOMContentLoaded', renderOrbit);