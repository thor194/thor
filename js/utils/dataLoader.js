// Data Loader - Fetches and parses songs.json

export async function loadSongs() {
    try {
        const response = await fetch('data/songs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.songs;
    } catch (error) {
        console.error('Error loading songs:', error);
        return [];
    }
}
