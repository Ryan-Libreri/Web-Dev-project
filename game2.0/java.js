window.addEventListener("DOMContentLoaded", () => {

    let cups = 0;
    let cupsPerSecond = 0;
    let brewMultiplier = 1;
    let grinderLevel = 0;
    let baristas = 0;
    let grinderCost = 20;
    let baristaCost = 50;

    let unlockedAchievements = new Set();

    const cupsCount = document.getElementById("CoffeeCount");
    const cupsPerSec = document.getElementById("CoffeePerSec");
    const brewButton = document.getElementById("brewButton");

    const grinderBtn = document.getElementById("buyGrinder");
    const baristaBtn = document.getElementById("buyBarista");

    const grinderCostText = document.getElementById("grinderCost");
    const baristaCostText = document.getElementById("baristaCost");

    const prestigeBtn = document.getElementById("prestigeButton");
    const brewMultText = document.getElementById("brewMultiplier");

    const achievementSound = new Audio("game2.0\achievement.mp3");
    const achievementList = document.getElementById("achievementList");

    function updateDisplay() {
        cupsCount.textContent = Math.floor(cups);
        cupsPerSec.textContent = cupsPerSecond;
        grinderCostText.textContent = grinderCost;
        baristaCostText.textContent = baristaCost;
        brewMultText.textContent = brewMultiplier;
    }

    brewButton.addEventListener("click", () => {
        cups += 1 * brewMultiplier;
        checkAchievements();
        updateDisplay();
    });

    grinderBtn.addEventListener("click", () => {
        if (cups >= grinderCost) {
            cups -= grinderCost;
            grinderLevel++;
            cupsPerSecond += 1;
            grinderCost = Math.floor(grinderCost * 1.5);
            updateDisplay();
        }
    });

    baristaBtn.addEventListener("click", () => {
        if (cups >= baristaCost) {
            cups -= baristaCost;
            baristas++;
            cupsPerSecond += 2;
            baristaCost = Math.floor(baristaCost * 1.75);
            updateDisplay();
        }
    });

    prestigeBtn.addEventListener("click", () => {
        if (cups >= 1000) {
            cups = 0;
            cupsPerSecond = 0;
            grinderLevel = 0;
            baristas = 0;
            grinderCost = 20;
            baristaCost = 50;
            brewMultiplier += 1;
            unlockedAchievements.clear();
            achievementList.innerHTML = "";
            updateDisplay();
        } else {
            alert("You need at least 1000 cups to Prestige!");
        }
    });

    function checkAchievements() {
        const milestones = [
            { id: "ach1", text: "First Cup!", condition: () => cups >= 1 },
            { id: "ach10", text: "10 Cups Brewed", condition: () => cups >= 10 },
            { id: "grind1", text: "Upgraded Grinder", condition: () => grinderLevel >= 1 },
            { id: "bar1", text: "Hired First Barista", condition: () => baristas >= 1 },
        ];

        milestones.forEach((m) => {
            if (m.condition() && !unlockedAchievements.has(m.id)) {
                unlockedAchievements.add(m.id);
                const li = document.createElement("li");
                li.textContent = "🏆 " + m.text;
                achievementList.appendChild(li);

                achievementSound.currentTime = 0;
                achievementSound.play();
            }
        });
    }

    // Passive generation every second
    setInterval(() => {
        cups += cupsPerSecond * brewMultiplier;
        checkAchievements();
        updateDisplay();
    }, 1000);

    // Menu toggle logic
    const menuButtons = document.querySelectorAll(".menu-btn");
    const panels = document.querySelectorAll(".game-panel");

    menuButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetPanel = document.getElementById(button.dataset.panel);
            panels.forEach(panel => {
                if (panel === targetPanel) {
                    panel.classList.toggle("hidden");
                } else {
                    panel.classList.add("hidden");
                }
            });
        });
    });

    updateDisplay();
});