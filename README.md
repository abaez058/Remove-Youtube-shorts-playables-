# No YouTube Shorts & Playables

A tiny Chrome/Edge extension that removes YouTube Shorts and YouTube Playables from YouTube.

## What it does
- Hides Shorts and Playables in the sidebar, homepage, search results, subscriptions and channel pages
- Opens Shorts links (`/shorts/ID`) in the normal video player
- Redirects `/playables` pages to the YouTube homepage
- Includes a fallback sweeper that matches by text and links, so it keeps working if YouTube renames its elements

## Install (unpacked)
1. Download or clone this repo
2. Open `chrome://extensions` (or `edge://extensions`)
3. Turn on **Developer mode**
4. Click **Load unpacked** and select the extension folder

## Firefox
Add this to `manifest.json` before loading or submitting:

```json
"browser_specific_settings": { "gecko": { "id": "no-shorts@yourname.example" } }
```

## Privacy
This extension collects no data, makes no network requests, and only runs on youtube.com.

## Files
- `manifest.json` – extension config (Manifest V3)
- `content.js` – redirects and fallback remover
- `hide-shorts.css` – CSS rules that hide Shorts and Playables
- `icons/` – extension icons

## License
MIT
