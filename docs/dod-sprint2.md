# Sprint 2 - Definition of Done (MVP Vertical Slice)

## A. Acceptance Checklist
- [x] **App boots locally:** verified via `python -m http.server`.
- [x] **Vertical slice complete:** input -> state update -> render -> GET -> PUT.
    - Start/Stop/Reset timer updates UI live.
    - Motivational quote fetched from RealInspire API.
    - Session synced to JSONBin (POST/PUT) on stop.
    - localStorage restores sessions on reload.
- [x] **UI states:** loading/empty/error paths implemented.
- [x] **Local-first boot:** reads from localStorage, then merges with cloud data.
- [x] **OO + modular design:** >= 3 classes (`Timer`, `Session`, `StorageManager`) and >= 6 modules implemented.
- [x] **Resilience:** basic retry handling for JSONBin requests.
- [x] **README updated:** includes MVP section, endpoints, and run steps.
- [x] **Performance:** no console errors during 30-60s demo run.

## B. Evidence:
- Project board (filtered to Spring-2 issues).
- Demo GIF (`/docs/media/mvp.gif`) showing boot -> GET -> timer -> PUT -> reload
- Release tag / commit: `v0.1-mvp`.
- Deploy/Run instructions verified locally and in README.

## C. Variance & Notes
- Added: auto-pause when window loses focus to prevent inaccurate timing.
- Deferred: data-chart visualization (moved to Spring 3).
- Lesson: localStorage merge logic simplified timer persistence flow.