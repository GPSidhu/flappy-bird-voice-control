function Background(config) {
    this.x = 0;
    this.y = 0;
    this.width = config.canvas.width;
    this.height = config.canvas.height;
    this.img = config.background;

    this.render = function(pause) {
        image(this.img, 0, 0, this.width, this.height)
    }
}