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
let gameVersion = 1; //1 -> with gravity, 2 -> without gravity
var scoreCounter;

const P_KEY = 80;
const R_KEY = 82;

document.getElementById("play").addEventListener("click", (e) => {
    let pauseBtn = document.getElementById('pause');
    if (pauseBtn) {
        pauseBtn.style.display = "block";
        e.target.style.display = "none";
    }
    togglePause()
});

document.getElementById("pause").addEventListener("click", (e) => {
    let playBtn = document.getElementById('play');
    if (playBtn) {
        playBtn.style.display = "block";
        e.target.style.display = "none";
    }
    togglePause();
});

document.getElementById("reload").addEventListener("click", restartGame);

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
        // game was paused, now play again
        pauseGame()
    } else {
        // game was on, now pause it
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
}

function playGame() {
    let scoreEl = document.getElementsByClassName("score")[0];
    if (scoreEl)
        scoreEl.classList.remove("blinking");
    
    clearInterval(scoreCounter);
    scoreCounter = setInterval(incrementScore, 1000);
}

function pauseGame() {
    let scoreEl = document.getElementsByClassName("score")[0]
    if (scoreEl && !isGameOver)
        scoreEl.classList.add("blinking");

    clearInterval(scoreCounter);
}

function incrementScore() {
    if (!pause && !isGameOver) {
        score += 10
    }
    document.getElementById("score").innerHTML = `${score}`;
}
