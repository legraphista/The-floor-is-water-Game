var Logic = {

    bestLocForBlock: function (game) {
        weights = new Array();
        sum = 0;

        for (column = 0; column < game.options.width; column++) {
            w = game.options.height;
            for (row = 0; row < game.options.height; row++)
                if (game.matrix[row][column].isValidForNewBlock() == false) {
                    w--;
                }
            weights.push(w);
            sum += w;
        }

        rand = Math.random() * sum;

        if (Math.between(0, rand, weights[0])) {
            return 0;
        }
        for (index = 1; index < weights.length; index++)
            weights[index] += weights[index - 1];

        for (index = 1; index < weights.length - 1; index++)
            if (Math.between(weights[index - 1], rand, weights[index]))
                return index;

        return weights.length - 1;
    }

}

Math.between = function (min, val, max){
    return ( min <= val && val <= max );
}