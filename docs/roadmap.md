# Roadmap

## MVP (Sprint 2)
- Start and stop a study timer
- Display a live timer that updates every second.
- Save completed sessions to local storage.
- Fetch and display a motivational quote from the RealInspire API.
- Sync each session to JSONBin (POST/PUT) after stopping the timer.
- Restore saved sessions and total study time on app load.
- Basic responsive layout for desktop and tablet widths.

**Vertical slice path:**
User starts timer -> timer updates state -> user stops timer -> render updates totals -> PUT session to JSONBin -> restore from local storage on reload.

---

## Full (Sprint 3)
- Add a Chart.js bar chart showing total minutes per subject.
- Add import/export of session history as JSON.

---

## Risks & Mitigations (Top 3)
1. **API quota or downtime** -> Cache the last successful quote in local storage and use it offline.
2. **Cloud sync errors** -> Implement retry with backoff and show user feedback.

3. **Local data loss (user clears storage)** -> Provide Export/Import feature for manual backups.
