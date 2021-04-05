function Tree(img, w, h) {
    this.x = width;
    this.y = 400 - h;
    this.img = img;
    this.speed = 2;
    this.width = w;
    this.height = h;

    this.show = function() {
        image(this.img, this.x, this.y, this.width, this.height)
    }
    this.offscreen = function() {
        return this.x < -this.width
    }
    this.update = function() {
        this.x -= this.speed;
    }
}