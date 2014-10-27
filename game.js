var Options = {
    "height": 0,
    "width": 12,
    "pxWidth" : 600,
    "pxHeight" : 450,
    "blockWidth": 50,
    "pxSpeed": 0.12,
    "FPS": 60,
};

var Game = {};
Game.secondCount = 0;
Game.tickCount = 0;
Game.matrix = new Array();
Game.DEBUG = true;

Game.options = Options;

Game.init = function () {
    this.options.blockWidth = this.options.pxWidth / this.options.width;
    this.displayOffset = 0;
    this.drawTable = document.getElementById("game-board");
    this.options.height = this.options.pxHeight / this.options.blockWidth;


    for (k = 0; k <= this.options.height; k++) {
        this.matrix.addRow();
    }

    for (k = 0; k < this.matrix[0].length; k++ ){
        this.matrix[0][k].visible(true);
        this.matrix[1][k].visible(true); 
        this.matrix[2][k].visible(true);   
    }

    this.timer = setInterval(function () { Game.tick() }, 1000 / this.options.FPS);
}

Game.matrix.addRow = function () {
    var arr = new Array();
    for (i = 1; i <= Game.options.width; i++)
        arr.push(undefined);

    Game.matrix.push(arr);

    for (i = 0; i < Game.options.width; i++)
        this.block(this.length - 1, i);
}

Game.matrix.deleteRow = function () {
    var itemsToDelete = this[0];
    for (index = 0; index < itemsToDelete.length; index++) {
        itemsToDelete[index].visible(false);
        delete itemsToDelete[index];
    }

    this.splice(0, 1);
    delete itemsToDelete;
}

Game.matrix.block = function (row, index) {
    Game.matrix[row][index] = HTMLI.createBlock(Game);
    Game.matrix[row][index].setPoz(row, index);
    //Game.matrix[row][index].visible( Math.floor(Math.random() * 10 % 3) );
}

Game.render = function (updateLayout) {
    this.drawTable.style.top = (-this.options.blockWidth + this.displayOffset) + "px";

    if (updateLayout) {
        for (row = 0; row < this.matrix.length; row++)
            for (index = 0; index < this.matrix[row].length; index++)
                this.matrix[row][index].setPoz(row, index);
    }

}

Game.tick = function () {

    this.tickCount++;
    if (this.tickCount == this.options.FPS) {
        this.tickCount = 0;
        this.secondCount++;
    }


    needUpdate = false;
    this.displayOffset = (this.displayOffset + this.options.pxSpeed);

    if (this.displayOffset >= this.options.blockWidth) {
        this.displayOffset %= this.options.blockWidth;

        this.matrix.deleteRow();
        this.matrix.addRow();

        needUpdate = true;
    }

    if (this.tickCount % 30 == 0) {
        
        column = Logic.bestLocForBlock(this);

        for (row = 0; row < this.matrix.length; row++)
            if (this.matrix[row][column].visible() == false) {
                this.matrix[row][column].visible(true);
                break;
            }

    }

    this.render(needUpdate);
}