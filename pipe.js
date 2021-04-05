function Pipe(config) {
    this.minHeight = 0;
    this.top = random(100, height/2);
    this.bottom = random(100, height/2 - 100);
    this.x = width;
    this.w = 90;
    this.speed = 2;
    this.baseWidth = 100;
    this.baseHeight = 30;
    this.topImg = config.image.top;
    this.bottomImg = config.image.bottom;

    this.show = function() {
        fill('lightgreen')
        if (this.highlight)
            fill('red')
        
        // Bottom pipe
        image(this.bottomImg, this.x, height - this.bottom, this.w, this.bottom)

        // Top pipe
        image(this.topImg, this.x, 0, this.w, this.top)
        //rect(this.x, 0, this.w, this.top)

        
        //rect(this.x, height - this.bottom, this.w, this.bottom)

        // Top pipe's opening which is a bit wider than the full pipe's width
        //let offset = (this.baseWidth - this.w) / 2;
        
        // fill('green')

        // if (this.highlight)
        //     fill('red')

        //rect(this.x - offset, this.top - this.baseHeight, this.baseWidth, this.baseHeight);
        
        // Bottom pipe's opening
        //rect(this.x - offset, height - this.bottom, this.baseWidth, this.baseHeight);
    }

    this.offscreen = function() {
        return this.x < -this.w
    }

    this.hits = function(bird) {
        if ((bird.y - 5) <= this.top || (bird.y) >= height - this.bottom) {
            if (bird.x >= this.x && bird.x <= this.x + this.w) {
                this.highlight = true;
                console.log('bird.x: '+bird.x+' , pipe.x: '+this.x);
                console.log('bird.y: '+bird.y+' , pipe.y: '+this.top);

                debugger;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.update = function(pause) {
        if (!pause)
            this.x -= this.speed;
    }
}