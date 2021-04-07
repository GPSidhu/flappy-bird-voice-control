const VERSION = {
    WITH_GRAVITY: 1,
    WITHOUT_GRAVITY: 2
}
const MODE = {
    ACTION: 'action',
    TRIAL: 'trial'
}
var bird, birdImg, birdGif, birdConfig;
var controller;
var pipes = [], pipeConfig; 
let gameBg, gameConfig;
let pause = true;
let isGameOver = false;
let onGameOverScreen = false;
let playButton;
let score = 0;
let gameMode = 'action'; //'trial','action'
let gameVersion = VERSION.WITH_GRAVITY; //1 -> with gravity, 2 -> without gravity

var scoreCounter;
let isMicOn = false;
const P_KEY = 80;
const R_KEY = 82;

document.getElementById("play").addEventListener("click", (e) => {
    togglePause()
});

document.getElementById("pause").addEventListener("click", (e) => {
    togglePause();
});

document.getElementById("voice").addEventListener("click", (e) => {
    toggleVoiceControl(e)
});

document.getElementById("reload").addEventListener("click", restartGame);

document.getElementById("gravity-enabled").addEventListener("click", disableGravity);

document.getElementById("gravity-disabled").addEventListener("click", enableGravity);

function preload() {
    gameConfig = {
        background: loadImage('./images/gameBg.jpeg'), 
        canvas : {
            height: 500,
            width: 600,
        },
        mode: gameMode,
        version: gameVersion
    }
    pipeConfig = {
        image: {
            top: loadImage('./images/topPipe.png'),
            bottom: loadImage('./images/bottomPipe.png')
        },
        gameConfig: gameConfig
    }
    birdConfig = {
        image: {
            live: loadImage('./images/bird.gif'),
            paused: loadImage('./images/bird.png'),
            dead: loadImage('./images/birdDead.png')
        },
        gameConfig: gameConfig
    }
    bgImg = loadImage('./images/gameBg.jpeg')
}

function setup() {
    let pc = document.getElementById('game-container')
    gameConfig.canvas.width = Math.floor(pc.clientWidth * 0.5)
    let cnv = createCanvas(gameConfig.canvas.width, gameConfig.canvas.height);
    cnv.parent("game-container");
    reset();
}

function draw() {
        background(255);
        gameBg.render(pause);
        //gameBg.update(pause); // to do - fill bg gap
        if (isGameOver) {
            drawPipes();
            bird.show(true /**pause */, true /**isGameOver */);
            if (!onGameOverScreen)
                showGameOver();
        } else {
            drawPipes();
            bird.update(pause);
            bird.show(pause, false);
        }
}

function drawPipes() {
    if (frameCount % 100 === 0 && !pause)
    pipes.push(new Pipe(pipeConfig))

    for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            if (!pause && !isGameOver) {
                pipes[i].update(pause);
                if (pipes[i].offscreen())
                    pipes.splice(i, 1);

                if (pipes[i].hits(bird)) {
                    console.log("Bird hit - game over!!!")
                    isGameOver = true;
                }
            }
    }
}

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

function toggleVoiceControl(e) {
    if (!isGameOver) {
        if (!isMicOn) { //mic is off, enable it
            enableVoiceControl(e)
        } else {
            // disable mic
            disableVoiceControl(e)
        }
    }
}

function enableVoiceControl(e) {
    if (e && e.target)
        e.target.classList.add("listening");

    document.getElementById("mic-tooltip").innerHTML = "Disable Voice Control";
    document.getElementById("listening-txt").style.display = "block";
    listen();
    isMicOn = true;
}

function disableVoiceControl(e) {
    if (e && e.target)
        e.target.classList.remove("listening");

    stopListening();
    document.getElementById("mic-tooltip").innerHTML = "Enable Voice Control";
    document.getElementById("listening-txt").style.display = "none";
    document.querySelector('#console').textContent = '';
    isMicOn = false;
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
