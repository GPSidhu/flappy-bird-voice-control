function Background(config) {
    this.width = config.canvas.width;
    this.height = config.canvas.height;
    this.x = 0;//this.width;
    this.speed = 1;
    this.img = config.background;
    this.gap = 0;

    this.render = function(pause) {
        //for(let i = 0; i < this.images.length; i++) {
            noTint()
            image(this.img, this.x, 0, this.width, this.height)
            // if (this.x1 + this.width < width) {
            //     this.x2 = this.x1 + this.width;
            //     image(this.img, this.x2, 0, this.width, this.height)
            // }
        //}
    }

    this.update = function(pause) {
        if (!pause) {
            this.x -= this.speed;
        }
    }
}
