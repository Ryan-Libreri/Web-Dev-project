window.addEventListener("DOMContentLoaded", () => {

const backgroundMusic = new Audio("music.mp3")
backgroundMusic.loop = true;  // Music loops forever
backgroundMusic.volume = 0.05  //music volume forr game
window.addEventListener("click", () =>{
    if(backgroundMusic.paused){
        backgroundMusic.play().catch(err =>{
            console.log("Background music could not autoplay:", err)
        });
    }
}, {once: true });

const muteButton = document.getElementById("muteButton");

muteButton.addEventListener("click", () =>{
    backgroundMusic.muted = !backgroundMusic.muted;
    muteButton.textContent = backgroundMusic.muted ? "Unmute Music" : "Mute Msic";
})


    let cups = 0;
    let cupsPerSecond = 0;
    let brewMultiplier = 1;
    let prestigeCount = 0;
    let grinderLevel = 0;
    let baristas = 0;
    let grinderCost = 20;
    let baristaCost = 50;

    let unlockedAchievements = new Set();

    let prestigeRequirement = 10000 * Math.pow(3, prestigeCount);
    const cupsCount = document.getElementById("CoffeeCount");
    const cupsPerSec = document.getElementById("CoffeePerSec");
    const brewButton = document.getElementById("brewButton");

    const grinderBtn = document.getElementById("buyGrinder");
    const baristaBtn = document.getElementById("buyBarista");

    const grinderCostText = document.getElementById("grinderCost");
    const baristaCostText = document.getElementById("baristaCost");

    const prestigeBtn = document.getElementById("prestigeButton");
    const brewMultText = document.getElementById("brewMultiplier");

    const achievementSound = new Audio("achievement.mp3");
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
        if (cups >= prestigeRequirement) {
            if (confirm(`Are you sure you want to Prestige? This will reset your progress but increase your Brew Boost to x${brewMultiplier + 1}.`)) {
                cups = 0;
                cupsPerSecond = 0;
                grinderLevel = 0;
                baristas = 0;
                grinderCost = 20;
                baristaCost = 50;
    
                brewMultiplier += 1;
                prestigeCount += 1;
                updateBackgroundForPrestige();
    
                unlockedAchievements.clear();
                achievementList.innerHTML = "";
    
                alert(`Prestige complete! Your Brew Boost is now x${brewMultiplier}.`);
                updateDisplay();
            }
        } else {
            showNotification(`You need at least ${prestigeRequirement} cups to Prestige.`);
        }
    });

    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.classList.remove("hidden");
        notification.classList.add("show");
    
        setTimeout(() => {
            notification.classList.remove("show");
            notification.classList.add("hidden");
        }, 2500);
    }

    function updateBackgroundForPrestige() {
        const body = document.getElementById("gameBody");
        if (prestigeCount >= 10) {
            body.classList.add("prestige-10");
        } else {
            body.classList.remove("prestige-10")
        }
    }
    

    function checkAchievements() {
        const milestones = [
            {
                id: "ach1",
                name: "First Spill!",
                condition: "Brew 5 cups",
                description: "Oops, it still counts!",
                conditionFunc: () => cups >= 5
            },
            {
                id: "ach10",
                name: "Caffein Rookie",
                condition: "Brew 10 cups",
                description: "You're just getting started!",
                conditionFunc: () => cups >= 10
            },
            {
                id: "ach100",
                name: "Natural Brewer",
                condition: "Brew 100 cups",
                description: "Someone stop you!",
                conditionFunc: () => cups >= 100
            },
            {
                id: "ach500",
                name: "Mug Life",
                condition: "Serve coffee 500 times",
                description: "Welcome to the team!",
                conditionFunc: () => cups >= 500
            },
            {
                id: "ach1000",
                name: "Overflow Error",
                condition: "Serve coffee 1000 times",
                description: "Welcome to the team!",
                conditionFunc: () => cups >= 1000
            },
            {
                id: "grind1",
                name: "First grind, First Glory",
                condition: "Buy your first Grinder upgrade",
                description: "The grind never stops!",
                conditionFunc: () => grinderLevel >= 1
            },
            {
                id: "grind20",
                name: "The real grind",
                condition: "Upgrade grinder 20 times",
                description: "All grind, no glory",
                conditionFunc: () => grinderLevel >= 20
            },
            {
                id: "bar1",
                name: "Barista-in-Training",
                condition: "Hire your first barista",
                description: "The cat staff is in",
                conditionFunc: () => baristas >= 1
            },
            {
                id: "bar10",
                name: "Feline Frenzy",
                condition: "Hire 10 baristas",
                description: "The fur is flying- and so is the coffee!",
                conditionFunc: () => baristas >= 1
            },
           
        ];
    
        milestones.forEach((m) => {
            if (m.conditionFunc() && !unlockedAchievements.has(m.id)) {
                unlockedAchievements.add(m.id);
    
                const row = document.createElement("tr");
    
                const nameCell = document.createElement("td");
                nameCell.textContent = m.name;
    
                const conditionCell = document.createElement("td");
                conditionCell.textContent = m.condition;
    
                const descriptionCell = document.createElement("td");
                descriptionCell.textContent = m.description;
    
                row.appendChild(nameCell);
                row.appendChild(conditionCell);
                row.appendChild(descriptionCell);
    
                document.getElementById("achievementList").appendChild(row);
    
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