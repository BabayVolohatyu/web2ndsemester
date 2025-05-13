'use strict';

let level = 1;
let timeToDuel = 500;
let readyToDuel = false;

let time;
let score;

//dom
const elements = {
    startButton: document.querySelector('.button-start-game'),
    restartButton: document.querySelector('.button-restart'),
    nextButton: document.querySelector('.button-next-level'),
    gameMenu: document.querySelector('.menu'),
    wrapper: document.querySelector('.wrapper'),
    gamePanels: document.querySelector('.game-panels'),
    gameScreen: document.querySelector('.game-screen'),
    winScreen: document.querySelector('.win-screen'),
    gunman: document.querySelector('.gunman'),
    timeYou: document.querySelector('.you-time'),
    timeGunman: document.querySelector('.gunman-time'),
    showLevel: document.querySelector('.score-panel__level'),
    message: document.querySelector('.message'),
};

const sounds = {
    intro: new Audio('sfx/intro.m4a'),
    wait: new Audio('sfx/wait.m4a'),
    fire: new Audio('sfx/fire.m4a'),
    shot: new Audio('sfx/shot.m4a'),
    win: new Audio('sfx/win.m4a'),
    death: new Audio('sfx/death.m4a'),
};

elements.startButton.addEventListener('click', startGame);
elements.restartButton.addEventListener('click', restartGame);
elements.nextButton.addEventListener('click', nextLevel);

function startGame() {
    // Hide the main game menu (e.g., the "Start Game" button)
    toggleVisibility([elements.gameMenu], 'none');

    // Show the game panels, the main game screen, and the wrapper container
    toggleVisibility([elements.gamePanels, elements.gameScreen, elements.wrapper], 'block');

    // Display how long the gunman will wait before shooting (convert from ms to s, fixed to 2 decimals)
    elements.timeGunman.innerHTML = (timeToDuel / 1000).toFixed(2);

    // Initialize the player's reaction time display to 0.00
    elements.timeYou.innerHTML = '0.00';

    // Get the current score from the DOM and store it in the `score` variable
    score = +document.querySelector('.score-panel__score_num').innerHTML;

    // Display the current level on screen (e.g., "level: 1")
    elements.showLevel.textContent = `level: ${level}`;

    // Add a CSS class to the gunman to reflect the current level's difficulty or style
    elements.gunman.classList.add(`gunman-level-${level}`);

    // Add an event listener to detect when the gunman's transition (movement animation) ends
    // Once the movement is complete, `prepareForDuel` will be triggered
    elements.gunman.addEventListener('transitionend', prepareForDuel);

    // Randomly choose which side (left or right) the gunman will appear from
    const side = Math.random() > 0.5 ? 'left' : 'right';

    // If the side is 'right', add the corresponding CSS class to place the gunman correctly
    if (side === 'right') elements.gunman.classList.add('gunman-right');

    // Start the gunman's movement animation after a short delay (500 milliseconds)
    setTimeout(() => moveGunman(side), 500);
}

function restartGame() {
    // Pause the 'death' sound in case it's still playing
    sounds.death.pause();

    // Hide the restart button after it was shown on death screen
    elements.restartButton.style.display = 'none';

    // Reset the message text and remove any visual win/death message classes
    resetMessage();

    // Remove the visual "death" effect from the game screen
    elements.gameScreen.classList.remove('game-screen--death');

    // Remove all gunman-related CSS classes (e.g. death, standing, shooting, etc.)
    removeGunmanClasses();

    // After a short delay (1 second), start a new game
    setTimeout(startGame, 1000);
}

function nextLevel() {
    // If the current level is less than 5, allow moving to the next level
    if (level < 5) {
        // Hide the "Next Level" button (it was shown after winning the previous level)
        elements.nextButton.style.display = 'none';

        // Clear any messages from the screen and remove win/death classes
        resetMessage();

        // Remove all the gunman's previous CSS classes (standing, shooting, etc.)
        removeGunmanClasses();

        // Increase the level number
        level++;

        // Adjust the time allowed before the gunman shoots:
        // Higher level = less reaction time
        timeToDuel = 1000 - level * 100;

        // Start the next level
        startGame();
    } else {
        // If level 5 has been completed, show the final victory screen
        showVictoryScreen();
    }
}

function moveGunman(side) {
    // Use a small delay (10ms) before applying movement
    setTimeout(() => {
        // Add a CSS class to make the gunman move in the specified direction
        elements.gunman.classList.add(`moving-${side}`);

        // Play the intro sound in a loop while the gunman is moving
        playSound(sounds.intro, true);
    }, 10); // Short delay to make sure the class is applied after the previous actions
}


function prepareForDuel() {
    // Stop the intro sound and play the "wait" sound (looped) as the duel prepares
    playSound(sounds.intro, false);
    playSound(sounds.wait, true);

    // Remove movement and position classes from the gunman to stop movement
    elements.gunman.classList.remove('moving-right', 'gunman-right', 'moving-left');

    // Add a class to set the gunman in a "standing" pose
    elements.gunman.classList.add('standing', `gunman-level-${level}__standing`);

    // After 1 second, prepare for the duel
    setTimeout(() => {
        // Stop the "wait" sound and add the "ready" class to indicate the gunman is ready to duel
        playSound(sounds.wait, false);
        elements.gunman.classList.add(`gunman-level-${level}__ready`);

        // Display a fire message and play the fire sound
        elements.message.classList.add('message--fire');
        playSound(sounds.fire);

        // Add an event listener to wait for the player to shoot the gunman
        elements.gunman.addEventListener('mousedown', playerShootsGunman);

        // Mark the duel as ready
        readyToDuel = true;

        // Start tracking the player's reaction time
        timeCounter(Date.now());

        // After the duel time, have the gunman shoot at the player
        setTimeout(gunmanShootsPlayer, timeToDuel);
    }, 1000); // Wait 1 second before transitioning to the ready state
}


function timeCounter(start) {
    // This function updates the player's reaction time during the duel
    const updateTime = () => {
        // If the duel is not ready to proceed (player hasn't clicked or the duel hasn't started), stop updating the time
        if (!readyToDuel) return;

        // Calculate the time elapsed since the duel started. The `+10` helps adjust any small delays in calculation
        time = ((Date.now() - start + 10) / 1000).toFixed(2);

        // Update the player's reaction time on the game screen (in seconds, to 2 decimal places)
        elements.timeYou.innerHTML = time;

        // Call the `updateTime` function every 10ms to continuously update the reaction time
        setTimeout(updateTime, 10);
    };

    // Start the time counter function
    updateTime();
}


function gunmanShootsPlayer() {
    // If the duel is not ready (i.e., the player hasn't shot yet), exit the function
    if (!readyToDuel) return;

    // Set the duel to not ready, as the gunman is about to shoot
    readyToDuel = false;

    // Remove the 'standing' class (the gunman was previously standing ready)
    elements.gunman.classList.remove('standing');

    // Add the 'shooting' class to the gunman to show the shooting animation for the current level
    elements.gunman.classList.add(`gunman-level-${level}__shooting`);

    // Set a timeout for the shot to be fired after a third of the time to duel has passed
    setTimeout(() => {
        // Play the sound of the shot being fired
        playSound(sounds.shot);

        // Change the message to indicate the player is dead
        elements.message.classList.replace('message--fire', 'message--dead');
        elements.message.innerHTML = 'You are dead!';

        // Add a 'death' class to the game screen to trigger a death animation or effect
        elements.gameScreen.classList.add('game-screen--death');
    }, timeToDuel / 3);

    // Remove the mouse click event listener from the gunman element (player can no longer shoot)
    elements.gunman.removeEventListener('mousedown', playerShootsGunman);

    // Set another timeout for the death sound and the appearance of the restart button after 1 second
    setTimeout(() => {
        // Play the death sound
        playSound(sounds.death);

        // Make the restart button visible so the player can restart the game
        elements.restartButton.style.display = 'block';
    }, 1000);
}


function playerShootsGunman() {
    // If the duel is not ready (i.e., the player has already shot or it's not time for the duel), exit the function
    if (!readyToDuel) return;

    // Set the duel to not ready, as the player has shot the gunman
    readyToDuel = false;

    // Play the sound of the player's shot
    playSound(sounds.shot);

    // Update the message to remove 'fire' class (the player has fired their shot)
    elements.message.classList.remove('message--fire');

    // Remove the gunman's 'standing' and 'shooting' classes (the gunman is no longer standing or shooting)
    elements.gunman.classList.remove('standing', `gunman-level-${level}__shooting`);

    // Add a class to indicate the gunman is now "dead" (this likely triggers a death animation)
    elements.gunman.classList.add(`gunman-level-${level}__death`);

    // Remove the 'mousedown' event listener from the gunman element to prevent further interaction
    elements.gunman.removeEventListener('mousedown', playerShootsGunman);

    // Play the win sound, indicating that the player won
    playSound(sounds.win);

    // Set a timeout for the "You Win!" message and next button to appear after a short delay
    setTimeout(() => {
        // Update the message to show that the player has won
        elements.message.classList.add('message--win');
        elements.message.innerHTML = 'You Win!';

        // Update the score by calling the score counting function
        scoreCount();

        // Make the "Next" button visible so the player can proceed to the next level
        elements.nextButton.style.display = 'block';
    }, 1000);
}


function scoreCount() {
    // Selects the element that displays the score on the screen
    const scoreDisplay = document.querySelector('.score-panel__score_num');

    // Calculate points based on the difference between timeToDuel and the player's time
    // This is then multiplied by the level and a factor of 10, and rounded to the nearest whole number
    const points = +((timeToDuel - parseFloat(elements.timeYou.innerHTML)) * level * 10).toFixed(0);

    // Update the displayed score with the new calculated points added to the previous score
    scoreDisplay.innerHTML = score + points;
}


function resetMessage() {
    // Clears the message content and removes specific classes for the state
    elements.message.innerHTML = '';
    elements.message.classList.remove('message--dead', 'message--win');
}


function removeGunmanClasses() {
    // List of gunman state classes to be removed
    const states = ['__standing', '__ready', '__shooting', '__death'];

    // Removes gunman classes related to the current level and state
    elements.gunman.classList.remove(`gunman-level-${level}`, ...states.map(state => `gunman-level-${level}${state}`));
}


function showVictoryScreen() {
    // Hide elements associated with the main game screen
    toggleVisibility([elements.message, elements.gameScreen, elements.gamePanels], 'none');

    // Retrieve the current score from the displayed score element
    score = +document.querySelector('.score-panel__score_num').innerHTML;

    // Display the score on the victory screen
    document.querySelector('.score-panel__win-score_num').innerHTML = score;

    // Show the victory screen
    elements.winScreen.style.display = 'block';
}


function toggleVisibility(elements, display) {
    // Iterates through each element and sets its display property to the specified value
    elements.forEach(element => element.style.display = display);
}


function playSound(sound, loop = false) {
    if (!sound) {
        console.error('Sound object is not defined!');
        return;
    }
    try {
        // Pause and reset the sound before playing it again
        sound.pause();
        sound.currentTime = 0;
        sound.loop = loop;

        // Play the sound and handle any playback errors
        sound.play().catch((e) => console.error('Playback failed:', sound.src, e));
    } catch (e) {
        console.error('Audio playback error:', e);
    }
}

