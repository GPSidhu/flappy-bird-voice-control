function Controller(canvas) {
    this.play = false;
    this.score = 0;
    this.scorePanelWidth = 50;
    this.scorePanelHeight = 20;
    this.x = canvas.width - this.scorePanelWidth;
    this.y = canvas.height - this.scorePanelHeight;

    this.incrementScore = function() {
        this.score += 5;
    }

    this.endGame = function() {
        
    }

    this.showScore = function() {
        fill(255)
        rect(this.x, this.y, this.scorePanelWidth, this.scorePanelHeight)
    }

    this.update = function() {

    }
}