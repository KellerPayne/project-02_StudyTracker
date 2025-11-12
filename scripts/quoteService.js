
// export default allows class import elsewhere
export default class QuoteService {
    
    // constructor that accepts URL to fetch quotes from; defaults to realinspire
    constructor(apiUrl = "https://api.realinspire.live/v1/quotes/random") {
        this.apiUrl = apiUrl;       // stores apiUrl in this.apiUrl for later use
    }

    // asynchronous function to fetch quotes
    async fetchQuote() {        // asynch allows for await to be used inside function
        try {
            // uses Fetch api to make an HTTP request to provided apiUrl
            // await pauses execution until fetch completes
            const response = await fetch(this.apiUrl);
            
            // checks for response.ok; if failed, throws error
            if (!response.ok) throw new Error("Quote fetch failed");

            // parses response as JSON
            const data = await response.json();

            //if data is an array, take first element, otherwise use data directly
            const quote = Array.isArray(data) ? data[0] : data;

            // returns simplified object with text and author properties
            return {
                text: quote.content,
                author: quote.author,
            };
            
        } catch (error) {
            console.error("Quote fetch error: ", error);
            
            // if error occurs when fetching quote, default quote will be displayed
            return {
                text: "Keep going - progress is built one session at a time.",
                author: "Study Tracker",
            };
        }
    }
}