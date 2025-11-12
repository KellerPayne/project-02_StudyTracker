export default class ThemeManager {

    constructor() {
        this.toggleBtn = document.getElementById("theme-toggle");
    }

    init() {
        if (!this.toggleBtn) return;

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.body.classList.add("dark");
            this.toggleBtn.textContent = "Light Mode"
        } else {
            this.toggleBtn.textContent = "Dark Mode";
        }

        this.toggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    toggleTheme() {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");

        this.toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }
}