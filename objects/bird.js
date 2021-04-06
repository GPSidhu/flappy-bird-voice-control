function Bird(config) {
    this.y = height/2;
    this.x = width/2 - 100;
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
    this.hasHit = false;
    this.height = 64;
    this.width = 64;
    this.img = config.image;
    this.gif = birdGif
    this.gameVersion = config.gameConfig.version

    this.show = function(pause, isGameEnded) {
        if (isGameEnded) {
            tint(227, 173, 132);
            image(this.img.dead, this.x, this.y, this.width, this.height)
        }
        else if (pause)
            image(this.img.paused, this.x, this.y, this.width, this.height)
        else
            image(this.img.live, this.x, this.y, this.width, this.height)
    }

    this.up = function() {
        switch(this.gameVersion) {
            case 1: this.velocity += this.lift;
                    break;
            case 2: this.y -= 20;
                    break;
            default: //
        }
    }
    this.down = function() {
        switch(this.gameVersion) {
            case 2: this.y += 20;
                    break;
            default: //
        }
    }

    this.hasHit = function() {
        return this.hasHit;
    }

    this.setHit = function() {
        this.hasHit = true;
    }

    this.update = function(isPaused) {
        if (!isPaused && gameVersion === 1) {
            this.velocity += this.gravity;
            this.velocity *= 0.9;
            this.y += this.velocity;

            if (this.y > height) {
                this.y = height - this.height / 2;
                this.velocity = 0;
            }
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }
    }
}
