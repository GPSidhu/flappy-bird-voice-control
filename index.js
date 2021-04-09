
// Register event listeners
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

// ****************** p5js functions : start ****************** //
function preload() {
    gameConfig = {
        background: loadImage('./images/gameBg.jpeg'), 
        canvas : {
            height: 500,
            width: 600,
        },
        mode: gameMode,
        version: gameVersion,
        speed: DEFAULT_SPEED
    }
    pipeConfig = {
        image: {
            top: loadImage('./images/topPipe.png'),
            bottom: loadImage('./images/bottomPipe.png')
        },
        gameConfig: gameConfig,
        minGap: DIFFICULTY_LEVELS[DEFAULT_DIFFICULTY].minGap,
        maxGap: DIFFICULTY_LEVELS[DEFAULT_DIFFICULTY].maxGap,
        hFactor: DIFFICULTY_LEVELS[DEFAULT_DIFFICULTY].hFactor,
    }
    birdConfig = {
        image: {
            live: loadImage('./images/bird.gif'),
            paused: loadImage('./images/bird.png'),
            dead: loadImage('./images/birdDead.png')
        },
        gameConfig: gameConfig,
        lift: DEFAULT_LIFT
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

// ****************** p5js functions : end ****************** //

function drawPipes() {
    // as speed increases, frameCount decreases
    if (frameCount % (SPEED_FRAMECOUNT__MAP[gameConfig.speed]) === 0 && !pause)
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
