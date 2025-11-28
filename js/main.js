// Main Application Entry Point
import { loadSongs } from './utils/dataLoader.js';
import { renderCards } from './components/cardRenderer.js';
import { modal } from './components/modal.js';

// Initialize the application
async function init() {
    // Get the grid container
    const grid = document.getElementById('song-grid');

    if (!grid) {
        console.error('Song grid container not found');
        return;
    }

    // Load songs from JSON
    const songs = await loadSongs();

    if (songs.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted);">No songs found.</p>';
        return;
    }

    // Render cards with click handler
    renderCards(songs, grid, (song) => {
        modal.open(song);
    });
}

// Main page references panel
function initMainReferences() {
    const footerBtn = document.getElementById('footer-references-btn');
    const mainPanel = document.getElementById('main-references-panel');
    const mainCloseBtn = document.getElementById('main-references-close');

    if (footerBtn && mainPanel && mainCloseBtn) {
        footerBtn.addEventListener('click', () => {
            mainPanel.classList.add('active');
        });

        mainCloseBtn.addEventListener('click', () => {
            mainPanel.classList.remove('active');
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainPanel.classList.contains('active')) {
                mainPanel.classList.remove('active');
            }
        });
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();
    initMainReferences();
});
