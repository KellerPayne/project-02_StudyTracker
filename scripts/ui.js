// Handles all DOM interactions, keeping user interface logic separate from core logic
// export default allows import elsewhere
export default class UI {

    // grabs DOM objects and stores them in variables for easier access later
    constructor() {
        this.timerDisplay = document.getElementById("timer-display");
        this.quoteDisplay = document.getElementById("quote");
        this.subjectInput = document.getElementById("subject");
        this.startBtn = document.getElementById("start-btn");
        this.stopBtn = document.getElementById("stop-btn");
        this.resetBtn = document.getElementById("reset-btn");
    }

    // updates timer display with formattetd string from Timer class
    updateTimerDisplay(formattedTime) {
        this.timerDisplay.textContent = formattedTime;
    }

    // updates quote element with new text and author
    updateQuote(text, author) {
        this.quoteDisplay.textContent = `"${text}" - ${author}`;
    }

    // retrieves subject from input field; defaults to "General" if not found
    getSubject() {
        const input = document.getElementById("subject");
        if (!input) {
            console.error('Subject input not found!');
            return "General";
        }
        return input.value.trim();
    }

    // clears subject input field
    clearSubject() {
        this.subjectInput.value = "";
    }

    // enables/disables Start and Stop buttons depending on if timer is running
    setButtonState({running}) {
        this.startBtn.disabled = running;
        this.stopBtn.disabled = !running;
    }

    // updates session history
    updateHistory(sessions) {
        const list = document.getElementById("history-list");
        list.innerHTML = ""; // clears previous items

        // if no sessions are present, shows placeholder
        if (sessions.length === 0) {
            list.innerHTML = "<li>No sessions yet. Start studying to see your history here!</li>";
            return;
        }

        // displays each session in reverse chronological order using lambda function
        sessions.slice().reverse().forEach((session) => {
            const item = document.createElement("li");
            const date = new Date(session.timestamp).toLocaleString();
            item.textContent = `${session.subject} - ${session.duration_minutes} min (${date})`;
            list.appendChild(item);
        });
    }

    // adds single session to top of history list
    addSessionToHistory(session) {
        const list = document.getElementById("history-list");
        // removes placeholder if it exists
        if (list.children.length === 1 && list.children[0].textContent.startsWith("No sessions")) {
            list.innerHTML = "";
        }

        const item = document.createElement("li");
        const date = new Date(session.timestamp).toLocaleString();
        item.textContent = `${session.subject} - ${session.duration_minutes} min (${date})`;
        list.prepend(item);
    }

    // ujpdates textual summary of total study time per subject
    updateSummary(sessions) {
        const summaryDiv = document.getElementById("summary");
        summaryDiv.innerHTML = "";

        if (sessions.length === 0) {
            summaryDiv.innerHTML = "<p>No data yet - start studying to see totals per subject!</p>";
            return;
        }

        const totals = {};
        sessions.forEach((s) => {
            if (!totals[s.subject]) totals[s.subject] = 0;
            totals[s.subject] += s.duration_minutes;
        });

        // sorts subjects alphabetically
        const stubjects = Object.keys(totals).sort();

        stubjects.forEach((subject) => {
            const p = document.createElement("p");
            p.textContent = `${subject}: ${totals[subject]} min`;
            summaryDiv.appendChild(p);
        });
    }

    // uses Chart.js to create a bar chart of total study time per subject
    renderSummaryChart(sessions) {
        const ctx = document.getElementById("summary-chart");
        if(!ctx) return;

        if (sessions.length === 0) {
            if(this.chart) {
                this.chart.destroy();
                this.chart = null;
            }
            return;
        }

        const totals = {};
        sessions.forEach((s) => {
            if(!totals[s.subject]) totals[s.subject] = 0;
            totals[s.subject] += s.duration_minutes;
        });

        const labels = Object.keys(totals);
        const values = Object.values(totals);

        if(this.chart) this.chart.destroy();

        // assigns color palette for each subject and rounds bar corners
        this.chart = new window.Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Total Study Time (minutes)",
                        data: values,
                        backgroundColor: labels.map((subject, i) => {
                            const palette = [
                                "#2563eb",
                                "#10b981",
                                "#f59e0b",
                                "#ef4444",
                                "#8b5cf6",
                                "#ec4899",
                                "#14b8a6",
                                "#6366f1",
                            ];
                            return palette[i % palette.length];
                        }),
                        borderRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {display: false},
                    title: {
                        display: false,
                        text: "Total Study Time per Subject",
                    },
                },
                scales: {
                    y: {beginAtZero: true},
                },
            },
        });
    }

    // updates weekly summary progress bar
    updateWeeklySummary(sessions) {
        const weeklyDiv = document.getElementById("weekly-summary");
        if (!weeklyDiv) return;
        
        // loads goal from LocalStorage
        const storedGoal = localStorage.getItem("weeklyGoalHours");
        const goalHours = storedGoal ? parseFloat(storedGoal) : 10; // default if storedGoal is null
        const goalMinutes = goalHours * 60;

        if (sessions.length === 0) {
            weeklyDiv.querySelector("p").innerHTML = `Total study time this week: 0 hrs`;
            document.getElementById("weekly-progress-bar").style.width = "0%";
            document.getElementById("weekly-goal-label").textContent = `Goal: ${goalHours} hrs`;
            return;
        }

        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklySessions = sessions.filter((s) => {
            const sessionDate = new Date(s.timestamp);
            return sessionDate >= startOfWeek;
        });

        const totalMinutes = weeklySessions.reduce(
            (sum, s) => sum + s.duration_minutes,
            0
        );

        const totalHours = (totalMinutes / 60).toFixed(2);

        const progressPercent = Math.min((totalMinutes / goalMinutes) * 100, 100);

        weeklyDiv.querySelector("p").innerHTML = `Total study time this week: ${totalHours} hrs`;
        const bar = document.getElementById("weekly-progress-bar");
        bar.style.width = `${progressPercent}%`;
        bar.style.background = 
            progressPercent >= 100
                ? "linear-gradient(90deg, #16a34a, #22c55e)"
                : "linear-gradient(90deg, #2563eb, #3b82f6)";
        document.getElementById("weekly-goal-label").textContent =
            `Goal: ${goalHours} hrs - ${progressPercent.toFixed(1)}% complete!`;
        
        const goalInput = document.getElementById("goal-input");
        if (goalInput) goalInput.value = goalHours;
    }
}