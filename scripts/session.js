// export default allows importing elsewhere
export default class Session {

    // creates a new study session with subject name, duration (in seconds), and when it occurred
    constructor(subject, durationSeconds, timestamp = new Date()) {
        this.subject = subject || "General";        // if no subject entered, subject defaults to "General"
        this.durationSeconds = durationSeconds;
        this.timestamp = timestamp;
    }

    // returns a clean JSON version for localStorage or JSONBin upload.
    toJSON() {
        return {
            subject: this.subject,
            // converts durationSeconds to rounded minutes
            duration_minutes: Math.round(this.durationSeconds/60),
            // converts timestamp to ISO string for consistent storage
            timestamp: this.timestamp.toISOString(),
        };
    }

    // converts raw seconds into a friendly "Xm Ys" format for display
    getFormattedDuration() {
        const minutes = Math.floor(this.durationSeconds / 60);
        const seconds = this.durationSeconds % 60;
        return `${minutes}m ${seconds}s`;
    }

    // rebuilds a session object from saved JSON (for restoring local data)
    static fromJSON(data) {
        const timestamp = new Date(data.timestamp);
        const durationSeconds = (data.duration_minutes || 0) * 60;
        return new Session(data.subject, durationSeconds, timestamp);
    }
}