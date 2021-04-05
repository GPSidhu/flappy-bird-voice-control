var bird, birdImg, birdGif;
var controller;
var pipes = [], pipeConfig; 
let gameBg, gameConfig;
let pause = false;

function preload() {
    gameConfig = {
        background: loadImage('./images/gameBg.jpeg'), 
        canvas : {
            height: 600,
            width: 600,
        }
    }
    pipeConfig = {
        image: {
            top: loadImage('./images/topPipe.png'),
            bottom: loadImage('./images/bottomPipe.png')
        }   
    }
    bgImg = loadImage('./images/gameBg.jpeg')
    birdGif = loadImage('./images/bird.gif')
    birdImg = loadImage('./images/bird.png')
}

function setup() {
    createCanvas(gameConfig.canvas.width, gameConfig.canvas.height);
    bird = new Bird(birdImg, birdGif);
    gameBg = new Background(gameConfig);
}

function draw() {
        background(255);
        gameBg.render(pause);
        bird.update(pause);
        bird.show(pause);
        drawPipes();
}

function drawPipes() {
    if (frameCount % 100 === 0 && !pause)
    pipes.push(new Pipe(pipeConfig))

    for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            if (!pause) {
                pipes[i].update(pause);
                if (pipes[i].offscreen())
                    pipes.splice(i, 1);

                if (pipes[i].hits(bird)) {
                    // to do - handle hit scenario
                    //togglePause()
                    //pause = true;
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
