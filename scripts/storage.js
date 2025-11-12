// export default allows importing in other files
export default class StorageManager {
    
    // sets up instance of StorageManager class
    constructor(binId, apiKey = "") {
        this.localKey = "study_sessions";       // key used for localStorage
        this.binId = binId;     // id of JSONBin for cloud storage
        this.apiKey = apiKey;       // optional key; needed if JSONBin is private
        this.baseURL = `https://api.jsonbin.io/v3/b/${binId}`;      // constructs API endpoint for bin
    }

    // saves sessions array to localStorage as a JSON string, ensuring data persistance across page reloads
    saveLocal(sessions) {
        localStorage.setItem(this.localKey, JSON.stringify(sessions));
    }

    // reads data from localStorage
    loadLocal() {
        const data = localStorage.getItem(this.localKey);

        // parses JSON data back to an array, or returns an empty array if nothing is stored
        return data ? JSON.parse(data) : [];
    }

    // deletes stored sessions from localStorage
    clearLocal() {
        localStorage.removeItem(this.localKey);
    }

    // uploads sessions array to JSONBin
    async uploadToCloud(sessions) {
        try {
            const response = await fetch(this.baseURL, {
                method: "PUT",      // PUT request to upload sessions
                headers: {
                    "Content-Type": "application/json",
                    "X-Master_Key": this.apiKey,
                },
                body: JSON.stringify(sessions), // converts sessions to JSON string
            });

            if (!response.ok) throw new Error("Cloud upload failed");
            return await response.json(); // if successful, returns JSON response from API
        } catch (err) {
            console.error("Upload error: ", err);
            return null;
        }
    }

    // fetches stored sessions fro JSONBin
    async fetchFromCloud() {
        try {
            const response = await fetch(this.baseURL, {
                method: "GET",      // GET request to pull sessions
                headers: {"X-Master-Key": this.apiKey},
            });

            if (!response.ok) throw new Error("Cloud fetch failed");
            const data = await response.json();     // if successful, returns JSON response from API
            return data.record || [];       // returns data.record if data is present; otherwise, an empty array
        } catch (err) {
            console.error("Cloud fetch error:", err);
            return [];
        }
    }
}