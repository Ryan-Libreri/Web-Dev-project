<<<<<<< HEAD
function checkBackgroundChange() {
    let background = document.getElementById("game-background");

    let backgrounds = {
        1000: "blue", // Ultimate coffee empire
        50: "red",   // Luxury café
        25: "green",   // Premium café
        10: "orange",   // Busy coffee shop
        0: "yellow"     // Default coffee shop
    };

    // Find the correct background based on customers served
    let newBackground = backgrounds[0]; // Default
    for (let key in backgrounds) {
        if (customersServed >= key) {
            newBackground = backgrounds[key];
        }
    }

    // Update the background dynamically
    background.style.backgroundImage = `url('${newBackground}')`;
}
=======

>>>>>>> 53f225a253baf89e14651e57df53bcc8d3df66df
