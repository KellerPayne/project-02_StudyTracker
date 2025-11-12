// import all modules for use within this file
import Timer from "./timer.js";
import Session from "./session.js";
import StorageManager from "./storage.js";
import QuoteService from "./quoteService.js";
import UI from "./ui.js";
import ThemeManager from "./theme.js";
import GoalManager from "./goals.js";

// constants for JSONBin storage
const BIN_ID = "6906c2ceae596e708f3e28d5";
const API_KEY = "$2a$10$w8CQXaOXDLFY.pnM.okA0.EQLsniDEWk/HFN7MDxrTgOF99AegUmi";

// creates instances of each class.
const storage = new StorageManager(BIN_ID, API_KEY);
const quoteService = new QuoteService();
const ui = new UI();
const timer = new Timer((formatted) => ui.updateTimerDisplay(formatted));

// loads previously saved sessions from localStorage; empty array if nothing exists in localStorage
let sessions = storage.loadLocal() || [];


const goalManager = new GoalManager(ui, sessions);
const themeManager = new ThemeManager();

// handles saving study sessions
async function saveSession() {

    // if sessions doesn't exits, sets sessions equal to an empty array
    if(!sessions) sessions = [];

    // stores current subject and timer duration in seconds
    const subject = ui.getSubject();
    const duration = timer.getElapsedSeconds();
    
    // if duration is less than 5 seconds, does nothing (accidental start)
    if (duration < 5) return;

    // new sesson instance
    const newSession = new Session(subject, duration);

    // converts new session instance to JSON
    sessions.push(newSession.toJSON());

    // updates localStorage
    storage.saveLocal(sessions);
    
    // updates session history in UI
    ui.addSessionToHistory(newSession.toJSON());

    // updates summary in UI
    ui.updateSummary(sessions);

    // updates summary chart in UI
    ui.renderSummaryChart(sessions);

    // updates weekly summary section in UI
    ui.updateWeeklySummary(sessions);

    // uploads data to JSONBin
    await storage.uploadToCloud(sessions);

    // clears input field
    ui.clearSubject();

    // resets buttons
    ui.setButtonState({running: false});

    console.log("Session saved:", newSession);
}

// handles updating quote section
async function updateQuote() {
    
    // pulls a new quote from API
    const {text, author} = await quoteService.fetchQuote();

    // updates UI with new quote
    ui.updateQuote(text, author);
}

// event listener for start button
ui.startBtn.addEventListener("click", () => {
    timer.start();
    ui.setButtonState({running: true});
});

// event listener for stop button
ui.stopBtn.addEventListener("click", async () => {
    timer.stop();
    await saveSession();
});

// event listener for reset button
ui.resetBtn.addEventListener("click", () => {
    timer.reset();
    ui.setButtonState({running: false});
});

// immediately invoked async function that initializes app
(async function init() {

    // resets timer display
    ui.updateTimerDisplay("00:00:00");

    // loads quote
    await updateQuote();

    // fetches previous study sessions from JSONBin
    const cloudData = await storage.fetchFromCloud();
    if (cloudData.length > 0) {
        sessions = cloudData;
        storage.saveLocal(sessions);
    }

    // updates history section
    ui.updateHistory(sessions);
    
    // updates summary section
    ui.updateSummary(sessions);

    // creates summary chart from fetched data from JSONBin
    ui.renderSummaryChart(sessions);

    // updates weekly summary section
    ui.updateWeeklySummary(sessions);

    themeManager.init();
    goalManager.init();

    console.log("App ready. Loaded sessions:", sessions);
})();

