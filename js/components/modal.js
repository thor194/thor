// Modal Controller - Handles modal open/close and content population

class ModalController {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.modal = document.getElementById('modal');
        this.closeBtn = document.getElementById('modal-close');
        this.expandBtn = document.getElementById('modal-expand');

        // Expanded state
        this.isExpanded = false;

        // Player elements
        this.youtubePlayer = document.getElementById('youtube-player');
        this.youtubeContainer = document.getElementById('youtube-container');
        this.spotifyContainer = document.getElementById('spotify-container');
        this.tabYoutube = document.getElementById('tab-youtube');
        this.tabSpotify = document.getElementById('tab-spotify');

        // Spotify player elements
        this.spotifyPlayer = document.getElementById('spotify-player');
        this.spotifyDuration = document.getElementById('spotify-duration');

        // Content elements
        this.topicEl = document.getElementById('modal-topic');
        this.titleEl = document.getElementById('modal-title');
        this.artistEl = document.getElementById('modal-artist');
        this.genreEl = document.getElementById('modal-genre');
        this.descriptionEl = document.getElementById('modal-description');
        this.lyricsEl = document.getElementById('lyrics-content');
        this.youtubeLinkEl = document.getElementById('youtube-link');

        // References panel elements
        this.referencesBtn = document.getElementById('references-btn');
        this.referencesPanel = document.getElementById('references-panel');
        this.referencesClose = document.getElementById('references-close');

        // Current song data
        this.currentSong = null;
        this.activePlayer = 'spotify';

        // Gradient animation
        this.animationId = null;
        this.startTime = null;

        this.bindEvents();
    }

    bindEvents() {
        // Close on button click
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on overlay click (not modal itself)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // Player tab switching
        this.tabYoutube.addEventListener('click', () => this.switchPlayer('youtube'));
        this.tabSpotify.addEventListener('click', () => this.switchPlayer('spotify'));

        // Expand button
        this.expandBtn.addEventListener('click', () => this.toggleExpand());

        // References panel
        this.referencesBtn.addEventListener('click', () => this.openReferences());
        this.referencesClose.addEventListener('click', () => this.closeReferences());
    }

    openReferences() {
        this.referencesPanel.classList.add('active');
    }

    closeReferences() {
        this.referencesPanel.classList.remove('active');
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.overlay.classList.toggle('expanded', this.isExpanded);
        this.modal.classList.toggle('expanded', this.isExpanded);
    }

    // Animated gradient orbs
    startGradientAnimation() {
        this.startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = (currentTime - this.startTime) / 1000;

            // Wave-like orb movements with different speeds and phases
            const orb1X = 20 + Math.sin(elapsed * 0.3) * 15 + Math.cos(elapsed * 0.5) * 10;
            const orb1Y = 30 + Math.cos(elapsed * 0.4) * 20;

            const orb2X = 80 + Math.sin(elapsed * 0.35 + 2) * 12 + Math.cos(elapsed * 0.25) * 8;
            const orb2Y = 70 + Math.sin(elapsed * 0.45 + 1) * 15;

            const orb3X = 50 + Math.cos(elapsed * 0.28 + 4) * 20;
            const orb3Y = 50 + Math.sin(elapsed * 0.38 + 3) * 18 + Math.cos(elapsed * 0.2) * 10;

            this.modal.style.setProperty('--orb1-x', `${orb1X}%`);
            this.modal.style.setProperty('--orb1-y', `${orb1Y}%`);
            this.modal.style.setProperty('--orb2-x', `${orb2X}%`);
            this.modal.style.setProperty('--orb2-y', `${orb2Y}%`);
            this.modal.style.setProperty('--orb3-x', `${orb3X}%`);
            this.modal.style.setProperty('--orb3-y', `${orb3Y}%`);

            this.animationId = requestAnimationFrame(animate);
        };
        this.animationId = requestAnimationFrame(animate);
    }

    stopGradientAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    switchPlayer(player) {
        this.activePlayer = player;

        // Update tab states
        this.tabYoutube.classList.toggle('active', player === 'youtube');
        this.tabSpotify.classList.toggle('active', player === 'spotify');

        // Update container visibility
        this.youtubeContainer.classList.toggle('active', player === 'youtube');
        this.spotifyContainer.classList.toggle('active', player === 'spotify');

        // Stop YouTube when switching to Spotify
        if (player === 'spotify') {
            this.youtubePlayer.src = '';
            // Load Spotify embed when switching to it
            if (this.currentSong && this.currentSong.spotifyId) {
                this.spotifyPlayer.src = `https://open.spotify.com/embed/track/${this.currentSong.spotifyId}?utm_source=generator&theme=0`;
            }
        } else if (this.currentSong) {
            // Stop Spotify and reload YouTube
            this.spotifyPlayer.src = '';
            this.youtubePlayer.src = `https://www.youtube.com/embed/${this.currentSong.youtubeId}?rel=0`;
        }
    }

    open(song) {
        // Store current song
        this.currentSong = song;

        // Always default to YouTube player
        this.activePlayer = 'youtube';

        // Set tab and container states - YouTube always active first
        this.tabYoutube.classList.add('active');
        this.tabSpotify.classList.remove('active');
        this.youtubeContainer.classList.add('active');
        this.spotifyContainer.classList.remove('active');

        // Populate content
        this.populate(song);

        // Show modal
        this.overlay.classList.add('active');
        document.body.classList.add('modal-open');

        // Start gradient animation
        this.startGradientAnimation();

        // Focus the close button for accessibility
        this.closeBtn.focus();
    }

    close() {
        // Hide modal
        this.overlay.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Stop gradient animation
        this.stopGradientAnimation();

        // Reset expanded state
        this.isExpanded = false;
        this.overlay.classList.remove('expanded');
        this.modal.classList.remove('expanded');

        // Close references panel
        this.closeReferences();

        // Stop both players by clearing src
        this.youtubePlayer.src = '';
        this.spotifyPlayer.src = '';

        // Clear current song
        this.currentSong = null;
    }

    isOpen() {
        return this.overlay.classList.contains('active');
    }

    populate(song) {
        // Set YouTube direct link
        this.youtubeLinkEl.href = song.youtubeUrl;

        // Always load YouTube first, clear Spotify
        this.youtubePlayer.src = `https://www.youtube.com/embed/${song.youtubeId}?rel=0`;
        this.spotifyPlayer.src = '';

        // Set duration display
        this.spotifyDuration.textContent = song.duration ? `Duration: ${song.duration}` : '';

        // Populate text content
        this.topicEl.textContent = song.topic;
        this.titleEl.textContent = song.title;
        this.artistEl.textContent = song.artist;
        this.genreEl.textContent = `${song.genre} · ${song.subGenre}`;

        // Convert description to paragraphs for better readability
        const paragraphs = song.description.split('\n\n').filter(p => p.trim());
        if (paragraphs.length > 1) {
            this.descriptionEl.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        } else {
            this.descriptionEl.textContent = song.description;
        }

        this.lyricsEl.textContent = song.lyrics;
    }
}

// Export singleton instance
export const modal = new ModalController();
