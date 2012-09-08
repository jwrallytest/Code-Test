var suitAbbr = ['c', 'd', 'h', 's'],
    royalAbbr = ['J', 'Q', 'K', 'A'],
    royalNames = ['Jack', 'Queen', 'King', 'Ace'],
    royalStartNumeric = 10,
    numberNames = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
    numericRegex = new RegExp('(\\d+)([' + suitAbbr.join() + '])', 'i'),
    royalRegex = new RegExp('([' + royalAbbr.join() + '])([' + suitAbbr.join() + '])', 'i');


/*
 Converts cards from string representation.
 Card values range from 1 - 52.
 clubs - 1 - 13
 diamonds - 14 - 26
 hearts - 27 - 39
 spades - 40 - 52


 */
function handFromString(input) {
    var strCards = input.split(' '),
        numericCards = [];

    if (strCards.length !== 5) {
        throw new Error('Should be 5 card poker hand');
    }

    strCards.forEach(function (card, index) {
        numericCards[index] = cardFromString(card);
    });

    return numericCards;

}


function handToString(numericCards) {
    var strCards = [];

    if (numericCards.length !== 5) {
        throw new Error('Should be 5 card poker hand');
    }

    numericCards.forEach(function (card, index) {
        strCards[index] = cardToString(card);
    });
    return strCards.join(' ');
}


function cardFromString(card) {
    var matches = numericRegex.exec(card),
        numericVal;

    if (matches) {
        // Matches will look somehting like this: [ '2c', '2', 'c', index: 0, input: '2c' ]
        // Cards numeric value starts at 1, not 2
        numericVal = parseInt(matches[1], 10) - 1;
        if (numericVal < 1 || numericVal > 9) {
            throw new Error('Invalid card');
        }
    } else {
        matches = royalRegex.exec(card);

        if (matches) {
            numericVal = royalStartNumeric + royalAbbr.indexOf(matches[1].toUpperCase());
        } else {
            throw new Error('Invalid card');
        }
    }

    // Add 13 for suit
    numericVal += (suitAbbr.indexOf(matches[2].toLowerCase()) * 13);
    return numericVal;
}

//Input: numeric card between 1-52, Ac = 13
function cardToString(card) {

    var faceValue = cardFaceValue(card),
        suitValue = cardSuitValue(card),
        strVal = '';

    if (faceValue < 1 || faceValue > 13) {
        throw new Error('Invalid card');
    }

    if (suitValue < 0 || suitValue > (suitAbbr.length - 1)) {
        throw new Error('Invalid card');
    }

    if (faceValue < 10) {
        strVal += (faceValue + 1).toString();
    } else {
        strVal += royalAbbr[faceValue - royalStartNumeric];
    }


    strVal += suitAbbr[suitValue];

    return strVal;
}

//Input: numeric card between 1-52, Ac = 13
function cardToOutputString(card) {
    var faceValue = cardFaceValue(card);

    if (faceValue >= royalStartNumeric) {
        return royalNames[faceValue - royalStartNumeric];
    }
    return numberNames[faceValue - 1];
}

// Input: numeric card
function cardFaceValue(card) {
    var fVal = card % 13;
    return fVal > 0 ? fVal : 13; // Aces are thirty
}
// Input: numeric card
function cardSuitValue(card) {
    return Math.ceil((card / 13) - 1);
}

module.exports = {
    handToString: handToString,
    handFromString: handFromString,
    cardToString: cardToString,
    cardFromString: cardFromString,
    cardFaceValue: cardFaceValue,
    cardSuitValue: cardSuitValue,
    cardToOutputString: cardToOutputString
};