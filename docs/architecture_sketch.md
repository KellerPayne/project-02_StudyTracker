# Architecture Sketch

project/
├─ index.html # Single-page shell
├─ src/
│ ├─ main.js # Entry point; initializes state, restores data
│ ├─ ui.js # View management and DOM rendering
│ ├─ timer.js # Timer class (start/stop, elapsed time)
│ ├─ session.js # Session class (subject, duration, timestamp)
│ ├─ storage.js # StorageManager (localStorage + JSONBin sync)
│ ├─ quoteService.js # Fetch motivational quotes from Quotable API
│ └─ utils.js # Helpers (formatting, date/time utilities)
└─ docs/
└─ (planning files)

**View composition / routing:**
Single-page layout managed by a lightweight view manager in `ui.js` (no navigation routes needed for MVP).

**Top-level modules (6+):** `main`, `ui`, `timer`, `session`, `storage`, `quoteService`, `utils`.

**Core classes (3):**
- `Timer`: handles start/stop logic and elapsed time.
- `Session`: represents a single study session.
- `StorageManager`: handles persistence (local+JSONBin).