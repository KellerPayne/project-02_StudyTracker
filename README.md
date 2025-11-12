# Study Tracker - Local-First Productivity Timer

A browser-based **study session tracker** that helps students monitor their focus time, visualize progress, and stay motivated - all **offline-first** and privacy-friendly.

---

## Features
- Start, stop, and reset a live study timer for any subject.
- Automatically saves all sessions locally using `localStorage`
- Syncs anonymous total study time to the cloud (JSONBin).
- Displays motivational quotes fetched from the [RealInspire API](https://api.realinspire.live/v1/quotes/random).
- Responsive layout designed for laptops and tablets.

---

## Screenshots / Demo
Timer Screenshots:
- [Timer Screenshot 1 (Light Mode)](docs/media/screenshot-1.png)
- [Timer Screenshot 2 (Dark Mode)](docs/media/screenshot-2.png) 

Short demo (120s): [Demo Video (docs/media/demo.mp4)](docs/media/demo.mp4)

---

## Live Demo / Run Instructions

### Live Demo
Hosted via GitHub Pages:
    https://github.com/KellerPayne/project-02_StudyTracker

*(Use hash routing or a 404.html redirect if you deploy as an SPA.)*

### Local Setup
```bash
git clone https://github.com/KellerPayne/project-02_StudyTracker.git
cd project-02_StudyTracker
python http-server
```

Then open http://localhost8000 in your browser.

Requirements:
- Modern Browser (Chrome, Edge, or Firefox)
- Designed for >= 1280x720 screens (desktop or tablet)

## How It Works (High Level)
- Rendering Stack: Vanilla JS + DOM modules (no frameworks)
- Architecture:
    -- Timer handles start/stop and elapsed time logic.
    -- Session stores individual study entries (subject, duration, timestamp).
    -- StorageManager persists data locally and syncs it to JSONBin.
    -- UI module updates the DOM in real time from state changes.
- Local-First Behavior:
    -- Saves all sessions and totals in localStorage.
    -- Restores immediately on page reload (no network needed).
    -- Syncs to JSONBin in the background when online.

## Data & Networking
Public GET - Motivational Quote
Endpoint: https://api.realinspire.live/v1/quotes/random
Example Response:
```json
{"content": "Discipline is the bridge between goals and accomplishment.", "author": "Jim Rohn"}
```

Cloud Write (JSONBin) - Study Session Log
Endpoint: https://api.jsonbin.io/v3/b/6906c2ceae596e708f3e28d5
Example Post Payload:
```json
{
    "timestamp": "2025-11-01T18:00:00Z",
    "subject": "Computer Science",
    "duration_minutes": 45
}
```
Merge Policy: Last-write-wins by timestamp (duplicates merged by subject + timestamp).
All data is anonymous and non-sensitive.

## Configuration
- Theme: dark/light toggle (saved in settings)
- Autosave Interval: every session stop or window unload

## Developer Docs
- `docs/pitch.md`
- `docs/roadmap.md`
- `docs/architecture_sketch.md`
- `docs/jsonbin_schema.md`
- `docs/dod_sprint1.md`
- `docs/dod_sprint2.md`
- `docs/dod_sprint3.md`

## License / Credits
Libraries:
- `JSONBin.io` - cloud storage
- `RealInspire API` - motivational quotes
- `Chart.js` - data visualization (Sprint 3)

Author: Keller Payne
Course: CSCI 4208 - Developing Advanced Web Applications
