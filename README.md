# Soundwave Music Dashboard

Soundwave is a responsive music dashboard built with semantic HTML, CSS, and vanilla JavaScript. Browse a small collection of songs, search by title or artist, and use the persistent Now Playing bar to move through the playlist.

## Features

- Dark responsive interface with sidebar navigation and a grid of six songs.
- Live, case-insensitive search by song title or artist.
- Selecting a song updates the Now Playing title, artist, and cover art.
- Previous and Next controls move through the song list and wrap at either end.
- Play/Pause toggles its icon and accessible button state.
- Sidebar tabs update the active highlight and main heading, then return the page to the top.
- Track progress and volume range controls are included in the player layout.
- Cover images are loaded from Picsum Photos, so an internet connection is needed to display them.

## Technology Stack

- HTML5 for page structure and accessible controls.
- CSS3 for the dark theme, responsive layout, and player styling.
- Vanilla JavaScript for search, song selection, playlist navigation, and sidebar state.
- No frameworks, package manager, or build step required.

## Local Setup

1. Download or clone this project and open its folder.
2. Open `index.html` directly in a browser, or serve the folder locally for a more consistent browser experience.

To start a local server with Python, run this command from the project folder:

```sh
python -m http.server 8000
```

On Windows, `py -m http.server 8000` may be used if `python` is not on your PATH. Visit [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C`.

## Quick Usage

1. Type in the search field to filter songs by title or artist. Clear the field to show all six cards again.
2. Select a song card to update the Now Playing information and artwork.
3. Use the Previous and Next icons to cycle through the song list.
4. Select Play or Pause to toggle the player button state.
5. Choose a sidebar tab to update its active highlight and the main heading.

The dashboard is a front-end demonstration: it does not stream audio, and the progress and volume sliders are not connected to an audio source.
