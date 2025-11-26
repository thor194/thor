// Card Renderer - Generates cards from song data

// YouTube icon SVG
const youtubeIcon = `<svg class="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
</svg>`;

// Create a single card element
function createCard(song) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.songId = song.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${song.title} by ${song.artist}`);

    // Generate tags HTML
    const tagsHTML = song.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // YouTube thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;

    card.innerHTML = `
        <div class="card-thumbnail" style="background-image: url('${thumbnailUrl}')"></div>
        <div class="card-header">
            <span class="card-number">${song.number}</span>
            ${youtubeIcon}
        </div>
        <div class="card-body">
            <span class="card-topic">${song.topic}</span>
            <h2 class="card-title">${song.title}</h2>
            <p class="card-artist">${song.artist}</p>
            <div class="card-tags">
                ${tagsHTML}
            </div>
        </div>
    `;

    return card;
}

// Render all cards to the grid
export function renderCards(songs, container, onCardClick) {
    // Clear existing content
    container.innerHTML = '';

    // Create and append cards
    songs.forEach(song => {
        const card = createCard(song);

        // Add click handler
        card.addEventListener('click', () => onCardClick(song));

        // Add keyboard handler (Enter/Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(song);
            }
        });

        container.appendChild(card);
    });
}
