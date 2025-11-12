export default class Timer {
    
    constructor(onTick) {
        // Callback function that runs every second (UI update)
        this.onTick = onTick;

        // Internal state
        this.startTime = null;
        this.elapsed = 0;
        this.running = false;
        this.interval = null;
    }

    // Starts or resumes timer
    // Calculates elapsed correctly even after pauses
    start() {
        if (this.running) return; // if timer is already running, does nothing.

        this.running = true;
        this.startTime = Date.now() - this.elapsed;
        
        this.interval = setInterval(() => {     // starts an interval that executes every 1000 ms (1s)
            // updates this.elapsed each tick using the current time minus the startTime
            this.elapsed = Date.now() - this.startTime;
            // calls onTick callback with formatted HH:MM:SS string.
            if (this.onTick) this.onTick(this.getFormattedTime());
        }, 1000); // update every second
    }

    // Pauses the timer and stops the interval loop
    stop() {
        if (!this.running) return;      // checks if timer is not running; if so, does nothing

        this.running = false;       // sets running to false
        clearInterval(this.interval);       // clears interval so callback stops
        this.interval = null;       // sets interval to null
        // updates elapsed to keep correct total time for if it resumes later on
        this.elapsed = Date.now() - this.startTime;
    }

    // Clears everything and resets time to 00:00:00
    reset() {
        clearInterval(this.interval); // clears interval so callback stops
        this.running = false;       // sets running to false
        this.elapsed = 0;       // sets elapsed to 0
        this.startTime = null;      // sets startTime to null
        if (this.onTick) this.onTick("00:00:00");       // calls onTick to update UI immediately
    }

    // returns total elapsed time in seconds.
    getElapsedSeconds() {
        return Math.floor(this.elapsed / 1000);
    }

    // Converts elapsed milliseconds into HH:MM:SS format for display
    getFormattedTime() {
        const totalSeconds = this.getElapsedSeconds();      // gets total number of seconds
        const hours = Math.floor(totalSeconds / 3600);      // calculates number of hours
        const minutes = Math.floor((totalSeconds % 3600) / 60);     // calculates number of minutes
        const seconds = totalSeconds % 60;      // calculates number of seconds
        
        // returns hours, minutes, and seconds, ensuring 1-digit numbers display as 01 instead of 1 and joins
        // values with a ":"
        return [hours, minutes, seconds].map((v) => v.toString().padStart(2, "0")).join(":");
    }

}