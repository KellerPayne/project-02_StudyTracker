export default class GoalManager {

    constructor(ui, sessions) {
        this.ui = ui;
        this.sessions = sessions;
        this.saveBtn = document.getElementById("save-goal-btn");
        this.input = document.getElementById("goal-input");
    }

    init() {
        if (!this.saveBtn || !this.input) return;
        this.saveBtn.addEventListener("click", () => this.saveGoal());
    }

    saveGoal() {
        const newGoal = parseFloat(this.input.value);

        if (isNaN(newGoal) || newGoal <= 0) {
            alert("Please enter a valid positive number for your goal");
            return;
        }

        localStorage.setItem("weeklyGoalHours", newGoal);
        this.ui.updateWeeklySummary(this.sessions);
        alert(`Weekly goal set to ${newGoal} hours!`);
    }
}