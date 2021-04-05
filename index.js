var bird, birdImg, birdGif;
var controller;
var pipes = [];
let gameBg;
var treeImg;
let trees = [];
let pause = false;

function preload() {
    treeImg = loadImage('./images/treePixel.jpeg')
    birdGif = loadImage('./images/bird.gif')
    birdImg = loadImage('./images/bird.png')
}

function setup() {
    let canvas = {
        height: 600,
        width: 600
    }
    createCanvas(canvas.width, canvas.height);
    bird = new Bird(birdImg, birdGif);
    pipes.push(new Pipe());
    //tree = new Tree(treeImg);
    gameBg = new Background(treeImg);
}

function draw() {
        background(255);
        gameBg.render(pause);
       // if (!bird.hasHit())
        bird.update(pause);
        bird.show(pause);
        
        if (frameCount % 100 === 0 && !pause)
            pipes.push(new Pipe())

        for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].show();
                if (!pause) {
                    pipes[i].update(pause);
                    if (pipes[i].offscreen())
                        pipes.splice(i, 1);
        
                    if (pipes[i].hits(bird)) {
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
