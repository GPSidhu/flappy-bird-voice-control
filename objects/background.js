function Background(img) {
    this.x = 0;
    this.y = 0;
    this.trees = [];

    this.render = function(pause) {
        fill('#9c522a')
        rect(0, 400, 600, 200)
        
        if (frameCount % 80 === 0 && !pause) {
            let r = random(70, 120)
            this.trees.push(new Tree(img, r, r))
        }

        for (let i = this.trees.length - 1; i >= 0; i--) {
            this.trees[i].show();

            if (!pause)
                this.trees[i].update();

            if (this.trees[i].offscreen())
                this.trees.splice(i, 1);
        }
    }
}