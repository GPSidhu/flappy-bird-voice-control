function Bird(birdImg, birdGif) {
    this.y = height/2;
    this.x = width/2 - 100;
    this.gravity = 0.7;
    this.lift = -18;
    this.velocity = 0;
    this.hasHit = false;
    this.height = 64;
    this.width = 64;
    this.img = birdImg;
    this.gif = birdGif

    this.show = function(pause) {
        image(pause ? this.img : this.gif, this.x, this.y, this.width, this.height)
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.hasHit = function() {
        return this.hasHit;
    }

    this.setHit = function() {
        this.hasHit = true;
    }

    this.update = function(isPaused) {
        if (!isPaused) {
            this.velocity += this.gravity;
            this.velocity *= 0.9;
            this.y += this.velocity;

            if (this.y > height - 200) {
                this.y = height - 200 - this.height / 2;
                this.velocity = 0;
            }
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }
    }
}
