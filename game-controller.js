
var bird, birdImg, birdGif, birdConfig;
var controller;
var pipes = [], pipeConfig; 
let gameBg, gameConfig;
let pause = true;
let isGameOver = false;
let onGameOverScreen = false;
let playButton;
let score = 0;
let gameMode = MODE.LIVE; //'trial','action'
let gameVersion = VERSION.WITH_GRAVITY; //1 -> with gravity, 2 -> without gravity
let difficulty;
let speed;
let lift;

var scoreCounter;
let isMicOn = false;


// Sliders
let speedSlider;
let difficultySlider;
let liftSlider;

function keyPressed() {
    if (keyCode === UP_ARROW && !pause) {
        bird.up();
        return;
    }
    
    if (keyCode === DOWN_ARROW && !pause) {
        bird.down();
        return;
    }

    if (keyCode === R_KEY) {
        restartGame();
        return;
    }

    if (keyCode === P_KEY) {
        togglePause();
        return;
    }
}

function togglePause() {
    if (!pause) {
        // game was on, now pause it
        pauseGame()
    } else {
        // game was on, now play again
        playGame()
    }
    pause = !pause;
}

function showGameOver() {
    clearInterval(scoreCounter);
    let el = document.getElementById('display-msg');
    if (el)
        el.innerHTML = "Game Over!!!";

    onGameOverScreen = true;
}

function reset() {
    pause = true;
    isGameOver = false;
    onGameOverScreen = false;
    pipes = [];
    bird = new Bird(birdConfig);
    gameBg = new Background(gameConfig);
    clearInterval(scoreCounter);
    score = 0;

    let el = document.getElementById('display-msg');
    if (el)
        el.innerHTML = "";
}

function restartGame() {
    reset();
    clearInterval(scoreCounter);
    scoreCounter = setInterval(incrementScore, 1000);
    showPlayBtn();
}

function playGame() {
    let scoreEl = document.getElementsByClassName("score")[0];
    if (scoreEl)
        scoreEl.classList.remove("blinking");
    
    clearInterval(scoreCounter);
    scoreCounter = setInterval(incrementScore, 1000);
    // show pause button
    if (!isGameOver)
        showPauseBtn();
}

function showPlayBtn() {
    let playBtn = document.getElementById('play');
    let pauseBtn = document.getElementById('pause');
    if (playBtn) {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    }
}

function pauseGame() {
    let scoreEl = document.getElementsByClassName("score")[0]
    if (scoreEl && !isGameOver)
        scoreEl.classList.add("blinking");

    clearInterval(scoreCounter);
    // show play button
    if (!isGameOver)
        showPlayBtn();
}

function showPauseBtn() {
    let pauseBtn = document.getElementById('pause');
    let playBtn = document.getElementById('play')
        if (pauseBtn) {
            pauseBtn.style.display = "block";
            playBtn.style.display = "none";
        }
}

function incrementScore() {
    if (!pause && !isGameOver) {
        score += 10
    }
    document.getElementById("score").innerHTML = `${score}`;
}

function enableGravity() {
    document.getElementById('gravity-enabled').style.display = "block";
    document.getElementById('gravity-disabled').style.display = "none";
    updateGameVersion(VERSION.WITH_GRAVITY);
}

function disableGravity() {
    document.getElementById('gravity-enabled').style.display = "none";
    document.getElementById('gravity-disabled').style.display = "block";
    updateGameVersion(VERSION.WITHOUT_GRAVITY)
}

function updateGameVersion(version) {
    gameConfig.version = version;
    gameVersion = version;
    if (bird)
        bird.setGameVersion(version);
}

function updateGameSpeed(speed) {
    gameConfig.speed = speed;
}

function updateBirdLift(lift) {
    birdConfig.lift = lift;
    if (bird)
        bird.setLift(lift)
}

speedSlider = document.getElementById("speed-slider");
speedSlider.oninput = function() {
    updateGameSpeed(this.value);
    console.log('speed changed: '+this.value)
}

difficultySlider = document.getElementById("difficulty-slider");
difficultySlider.oninput = function() {
    updateDifficulty(this.value);
    console.log('difficulty level updated: '+this.value)
}

liftSlider = document.getElementById("lift-slider");
liftSlider.oninput = function() {
    updateBirdLift(this.value);
    console.log('lift changed: '+this.value)
}

this.updateDifficulty = function(value) {
    // Need to update the pipeConfig only as the new pipes
    // will be created continuously with the updated config
    let newConfig = DIFFICULTY_LEVELS[value];
    pipeConfig.minGap = newConfig.minGap;
    pipeConfig.maxGap = newConfig.maxGap;
    pipeConfig.hFactor = newConfig.hFactor;
    updateGameSpeed(newConfig.speed);
}
