# SoundScape

An interactive music website exploring migration, borders, and belonging through curated playlists.

## Live Demo

[View Live Site](https://YOUR_USERNAME.github.io/soundScape/)

> Replace `YOUR_USERNAME` with your GitHub username after deployment.

## Features

- Interactive card-based grid layout
- Modal player with YouTube and Spotify integration
- Curated playlist of 10 songs exploring migration themes
- Responsive design for mobile and desktop
- Atmospheric visual effects

## Tech Stack

- Vanilla JavaScript (ES6 Modules)
- CSS3 (Custom Properties, Grid, Animations)
- HTML5

## Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve
```

Then visit `http://localhost:8000`

## Deployment to GitHub Pages

1. Push this repository to GitHub
2. Go to your repository's **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose the `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be live at `https://YOUR_USERNAME.github.io/soundScape/`

## Project Structure

```
soundScape/
├── index.html          # Main entry point
├── css/
│   ├── main.css        # Master stylesheet (imports all others)
│   ├── variables.css   # Design tokens
│   ├── base.css        # Reset & base styles
│   ├── layout.css      # Grid & container
│   ├── components/     # Component styles
│   └── effects/        # Animations & atmosphere
├── js/
│   ├── main.js         # App initialization
│   ├── components/     # UI components
│   └── utils/          # Utility functions
├── data/
│   └── songs.json      # Song metadata
└── assets/
    └── icons/          # SVG icons
```

## License

University Academic Project — Migration Studies
