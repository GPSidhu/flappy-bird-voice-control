function Pipe(config) {
    this.minHeight = 0;
    this.minGap = 100; // minimum gap between top and bottom pipes
    this.maxGap = 350; // maximum gap between top and bottom pipes
    this.gap = random(this.minGap,  this.maxGap);
    this.bottom = random(100, height/2 - 100);
    this.top = (height - this.bottom - this.gap); //random(100, height/2);
    this.x = width;
    this.w = 90;
    this.speed = 2;
    this.baseWidth = 100;
    this.baseHeight = 30;
    this.topImg = config.image.top;
    this.bottomImg = config.image.bottom;
    this.mode = config.gameConfig.mode;
    

    this.show = function() {
        // Bottom pipe
        //image(this.bottomImg, this.x, height - bH, this.w, bH);
        image(this.bottomImg, this.x, height - this.bottom, this.w, this.bottom)

        // Top pipe
        image(this.topImg, this.x, 0, this.w, this.top);
    }

    this.offscreen = function() {
        return this.x < -this.w
    }

    this.hits = function(bird) {
        if (this.mode === 'trial')
            return false;

        if (bird.y >= height - bird.height) {
            //this.highlight = true;
            return true;
        }
        if ((bird.y + 10 <= this.top) || (bird.y + 48 >= height - this.bottom)) {
            if (bird.x >= this.x && bird.x <= this.x + this.w) {
                //this.highlight = true;
                console.log('HIT -- bird.x: ' + bird.x + ' , pipe.x: ' + this.x);
                console.log('bird.y: ' + bird.y + ' , pipe.y: ' + this.top);
                return true;
            }
        }
        //this.highlight = false;
        return false;
    }

    this.update = function(pause) {
        if (!pause)
            this.x -= this.speed;
    }
}