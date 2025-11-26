// Modal Controller - Handles modal open/close and content population

class ModalController {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.modal = document.getElementById('modal');
        this.closeBtn = document.getElementById('modal-close');

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

        // Current song data
        this.currentSong = null;
        this.activePlayer = 'spotify';

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

        // Determine default player - YouTube for songs without Spotify
        const defaultPlayer = (song.preferYoutube || !song.spotifyId) ? 'youtube' : 'spotify';
        this.activePlayer = defaultPlayer;

        // Set tab and container states based on default player
        this.tabSpotify.classList.toggle('active', defaultPlayer === 'spotify');
        this.tabYoutube.classList.toggle('active', defaultPlayer === 'youtube');
        this.spotifyContainer.classList.toggle('active', defaultPlayer === 'spotify');
        this.youtubeContainer.classList.toggle('active', defaultPlayer === 'youtube');

        // Populate content
        this.populate(song);

        // Show modal
        this.overlay.classList.add('active');
        document.body.classList.add('modal-open');

        // Focus the close button for accessibility
        this.closeBtn.focus();
    }

    close() {
        // Hide modal
        this.overlay.classList.remove('active');
        document.body.classList.remove('modal-open');

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

        // Load the appropriate player based on preference
        if (song.preferYoutube || !song.spotifyId) {
            // Load YouTube first, clear Spotify
            this.youtubePlayer.src = `https://www.youtube.com/embed/${song.youtubeId}?rel=0`;
            this.spotifyPlayer.src = '';
        } else {
            // Load Spotify first, clear YouTube
            this.spotifyPlayer.src = `https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`;
            this.youtubePlayer.src = '';
        }

        // Set duration display
        this.spotifyDuration.textContent = song.duration ? `Duration: ${song.duration}` : '';

        // Populate text content
        this.topicEl.textContent = song.topic;
        this.titleEl.textContent = song.title;
        this.artistEl.textContent = song.artist;
        this.genreEl.textContent = `${song.genre} · ${song.subGenre}`;
        this.descriptionEl.textContent = song.description;
        this.lyricsEl.textContent = song.lyrics;
    }
}

// Export singleton instance
export const modal = new ModalController();
