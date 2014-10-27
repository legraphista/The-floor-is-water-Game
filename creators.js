var HTMLI = {};

HTMLI.createBlock = function (game) {
    var newBlock = document.createElement("div");
    newBlock.className = "block";

    newBlock.Game = game;

    newBlock.style.height = game.options.blockWidth + "px";
    newBlock.style.width = game.options.blockWidth + "px";


    newBlock.onScreen = false;

    newBlock.setPoz = function (row, index) {
        newBlock.style.position = "absolute";
        newBlock.style.left = (index * this.Game.options.blockWidth) + "px";
        newBlock.style.top = (this.Game.options.pxHeight - row * this.Game.options.blockWidth) + "px";

        if (this.Game.DEBUG) {
            this.innerText = row + " / " + index;
        }
    };

    newBlock.visible = function (visible) {
        if (visible === undefined)
            return (this.style.visibility == "visible");

        if (visible) {
            if (this.onScreen == false) {
                this.style.visibility = "visible"
                this.Game.drawTable.appendChild(this);
                this.onScreen = true;
            }
        } else {
            if (this.onScreen == true) {
                this.style.visibility = "hidden"
                this.Game.drawTable.removeChild(this);
                this.onScreen = false;
            }
        }
        return visible;
    }

    return newBlock;
}
