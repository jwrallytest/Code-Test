var handFactory = require('./lib/Hand'),
    cardUtils = require('./lib/CardUtils');

// Quick Manual Test
var i = 0,
    j,
    hand,
    rand;

for (; i < 20; ++i) {
    hand = [];
    for (j = 0; j < 5; ++j) {
        do {
            rand = Math.floor((Math.random() * 52) + 1);
        } while (hand.indexOf(rand) > -1);

        hand[j] = rand;

    }
    console.log(cardUtils.handToString(hand) + ' - ' + handFactory.fromNumeric(hand).rank());

}
