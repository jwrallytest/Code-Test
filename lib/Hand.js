var cardUtils = require('./CardUtils');


function Hand(cards) {
    this.cards = cards;
}

Hand.prototype.rank = function () {
    var self = this,
        sorted = self.cards.slice().sort(function (a, b) {return a - b;}),
        normalized = sorted.map(function (val) {return cardUtils.cardFaceValue(val); }).sort(function (a, b) {return a - b;}), // normalized by face value, sorted
        uniques = findUniques(normalized), // split face values into any pairs that may exists
        i;

    // The normalized array should be used for all checks except for FLUSH related
    // uniques will be an array of just unique face values

    // Straight Flush - sorted array is by face values by suits
    if (isStraight(sorted)) {
        if (cardUtils.cardFaceValue(sorted[0]) === 1 && cardUtils.cardFaceValue(sorted[4]) === 13) {
            // The wheel is straight to the 5
            return 'Straight Flush to the ' + cardUtils.cardToOutputString(sorted[3]);
        } else {
            return 'Straight Flush to the ' + cardUtils.cardToOutputString(sorted[4]);
        }

    }


    if (uniques.length === 2) {
        // Quads - 0 and 3 or 1 4
        if ((normalized[0] === normalized[3]) || (normalized[1] === normalized[4])) {
            return ('Quad ' + cardUtils.cardToOutputString(normalized[1]) + 's');
        } else {
            // Full House - if there are only 2 unique groups and its not quads, then its a boat
            if (normalized[0] === normalized[2]) {
                return 'Full House ' + cardUtils.cardToOutputString(normalized[0]) + 's' + ' over ' + cardUtils.cardToOutputString(normalized[3]) + 's';
            } else {
                return 'Full House ' + cardUtils.cardToOutputString(normalized[3]) + 's' + ' over ' + cardUtils.cardToOutputString(normalized[0]) + 's';
            }

        }
    }

    // Flush - use sorted and check if each value has the same suit value
    if (isFlush(sorted)) {
        return ('Flush - ' + cardUtils.cardToOutputString(normalized[4]) + ' High');
    }

    // Straight - normalized since suit value does not matter
    if (isStraight(normalized)) {
        if (cardUtils.cardFaceValue(normalized[0]) === 1 && cardUtils.cardFaceValue(normalized[4]) === 13) {
            // The wheel is straight to the 5
            return 'Straight to the ' + cardUtils.cardToOutputString(normalized[3]);
        } else {
            return 'Straight to the ' + cardUtils.cardToOutputString(normalized[4]);
        }
    }

    if (uniques.length === 3) {
        // At this point, if uniques has only 3 cards, then has to be trips or 2 pair

        // Trips - 0 and 2, 1 and 3, 2 and 4
        if ((normalized[0] === normalized[2])) {
            return 'Trip ' + cardUtils.cardToOutputString(normalized[0]) + 's';
        } else if (normalized[1] === normalized[3]) {
            return 'Trip ' + cardUtils.cardToOutputString(normalized[1]) + 's';
        } else if (normalized[2] === normalized[4]) {
            return 'Trip ' + cardUtils.cardToOutputString(normalized[2]) + 's';
        }
        else {
            if (uniques[1] === normalized[3]) { // 2 2 4 4 K
                return '2 Pair, ' + cardUtils.cardToOutputString(uniques[1]) + 's and ' + cardUtils.cardToOutputString(uniques[0]) + 's';
            }
            else if (uniques[1] === normalized[1]) { // 2 4 4 6 6
                return '2 Pair, ' + cardUtils.cardToOutputString(uniques[2]) + 's and ' + cardUtils.cardToOutputString(uniques[1]) + 's';
            } else { // 2 2 4 6 6
                return '2 Pair, ' + cardUtils.cardToOutputString(uniques[2]) + 's and ' + cardUtils.cardToOutputString(uniques[0]) + 's';
            }
        }
    }

    // Pair
    if (uniques.length === 4) {
        for (i = 1; i < normalized.length; ++i) {
            if (normalized[i] === normalized[i - 1]) {
                return 'Pair of ' + cardUtils.cardToOutputString(normalized[i]) + 's';
            }
        }

    }

    //High card
    return 'High Card - ' + cardUtils.cardToOutputString(normalized[4]);

};

/**  Private Helpers **/

// input: cards must be sorted
function isStraight(cards) {
    var i = 1;

    for (; i < 4; ++i) {
        if (cards[i] - cards[i - 1] !== 1) {
            return false;
        }
    }

    // if 4 and 3 are a difference of 1, then we have a normal straight
    // if 4 and 3 are a difference of 9, then we have a wheel
    return (cards[4] - cards[3] === 1) || cards[4] - cards[3] === 9;

}

function isFlush(cards) {
    var suit = cardUtils.cardSuitValue(cards[0]);
    return cards.every(function (card) {return cardUtils.cardSuitValue(card) === suit;});
}

function findUniques(cards) {
    var i = 1,
        rVal = [cards[0]];
    for (; i < cards.length; ++i) {
        if (cards[i] !== cards[i - 1]) {
            rVal.push(cards[i])
        }
    }

    return rVal;
}

module.exports = {
    fromString: function (cards) {
        return new Hand(cardUtils.handFromString(cards));
    },
    fromNumeric: function (cards) {
        return new Hand(cards);
    }
};








