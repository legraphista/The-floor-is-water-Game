var HTMLI = {};

HTMLI.createBlock = function (game) {
    var newBlock = document.createElement("div");
    newBlock.className = "block";

    newBlock.Game = game;
    newBlock.willBeOccupied = false;

    newBlock.style.height = game.options.blockWidth + "px";
    newBlock.style.width = game.options.blockWidth + "px";
    newBlock.fallHeight = -game.options.blockWidth * game.options.height;

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
    };

    newBlock.occupied = function (willBe) {
        if (willBe === undefined)
            return this.willBeOccupied;

        this.willBeOccupied = willBe;
        return willBe;
    };

    newBlock.isValidForNewBlock = function () {
        return (!this.occupied() && !this.visible());
    };

    newBlock.fall = function () {
        if (this.fallHeight > 0) {
            this.fallHeight = 0;
            this.setFallTransform();
        } else {
            this.fallHeight += this.Game.options.fallRate;
            this.setFallTransform();
            setTimeout(function () { newBlock.fall() }, 1000 / this.Game.options.FPS);
        }
    };

    newBlock.setFallTransform = function () {
        this.style.marginTop = this.fallHeight + "px";
    };

    newBlock.falling = function () {
        return this.fallHeight != 0;
    }

    return newBlock;
}
