var bird, birdImg, birdGif, birdConfig;
var controller;
var pipes = [], pipeConfig; 
let gameBg, gameConfig;
let pause = false;
let gameIsEnded = false;
let playButton;
let score = 0;

var scoreCounter = setInterval(incrementScore, 1000);
function incrementScore() {
    if (!pause && !gameIsEnded)
        score += 10
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

document.getElementById("reload").addEventListener("click", function() {
    reset();
});

function preload() {
    gameConfig = {
        background: loadImage('./images/gameBg.jpeg'), 
        canvas : {
            height: 500,
            width: 600,
        }
    }
    pipeConfig = {
        image: {
            top: loadImage('./images/topPipe.png'),
            bottom: loadImage('./images/bottomPipe.png')
        }   
    }
    birdConfig = {
        image: {
            live: loadImage('./images/bird.gif'),
            paused: loadImage('./images/bird.png'),
            dead: loadImage('./images/birdDead.png')
        }
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
        if (gameIsEnded) {
            drawPipes();
            bird.show(true, true);
            setTimeout(() => showGameOver(), 1000);
        } else {
            drawPipes();
            bird.update(pause);
            bird.show(pause);
        }
}

function drawPipes() {
    if (frameCount % 100 === 0 && !pause)
    pipes.push(new Pipe(pipeConfig))

    for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            if (!pause && !gameIsEnded) {
                pipes[i].update(pause);
                if (pipes[i].offscreen())
                    pipes.splice(i, 1);

                if (pipes[i].hits(bird)) {
                    console.log('hit')
                    // to do - handle hit scenario
                    //togglePause()
                    //pause = true;
                    gameIsEnded = true;
                }
            }
    }
}

function keyPressed() {
    if (key === ' ' && !pause)
        bird.up()
    if (key === 'p' || key === 'P')
        togglePause();
}

function togglePause() {
    pause = !pause;
}

function showGameOver() {
    clearInterval(scoreCounter);
    document.getElementById('display-msg').innerHTML = "Game Over!!!";
}

function reset() {
    pause = false;
    gameIsEnded = false;
    pipes = [];

    bird = new Bird(birdConfig);
    gameBg = new Background(gameConfig);
}