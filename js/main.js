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

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
