var cardUtils = require('../lib/CardUtils'),
    assert = require('assert');


describe('CardUtils', function () {
    describe('cardFaceValue', function () {
        // cardFaceValue
        it('cfv-ac', function () {
            assert.equal(cardUtils.cardFaceValue(13), 13);
        });
        it('cfv-2d', function () {
            assert.equal(cardUtils.cardFaceValue(14), 1);
        });
        it('cfv-8d', function () {
            assert.equal(cardUtils.cardFaceValue(20), 7);
        });
        it('cfv-ks', function () {
            assert.equal(cardUtils.cardFaceValue(51), 12);
        });
        it('cfv-jh', function () {
            assert.equal(cardUtils.cardFaceValue(36), 10);
        });
        it('cfv-10h', function () {
            assert.equal(cardUtils.cardFaceValue(35), 9);
        });
    });
    describe('cardSuitValue', function () {
        // cardSuitValue
        it('csv-10h', function () {
            assert.equal(cardUtils.cardSuitValue(35), 2);
        });
        it('csv-2c', function () {
            assert.equal(cardUtils.cardSuitValue(1), 0);
        });
        it('csv-as', function () {
            assert.equal(cardUtils.cardSuitValue(52), 3);
        });
        it('csv-kd', function () {
            assert.equal(cardUtils.cardSuitValue(25), 1);
        });
    });

    describe('cardFromString', function () {
        // cardFromString
        it('cfs-ace-clubs-normal', function () {
            assert.equal(cardUtils.cardFromString('Ac'), 13);
        });
        it('cfs-ace-clubs-upper-suit', function () {
            assert.equal(cardUtils.cardFromString('AC'), 13);
        });
        it('cfs-ace-clubs-lower-ace', function () {
            assert.equal(cardUtils.cardFromString('ac'), 13);
        });
        it('cfs-2-clubs-normal', function () {
            assert.equal(cardUtils.cardFromString('2c'), 1);
        });
        it('cfs-2-spades-normal', function () {
            assert.equal(cardUtils.cardFromString('2s'), 40);
        });
        it('cfs-king', function () {
            assert.equal(cardUtils.cardFromString('Ks'), 51);
        });
        it('cfs-queen', function () {
            assert.equal(cardUtils.cardFromString('Qc'), 11);
        });
        it('cfs-jack', function () {
            assert.equal(cardUtils.cardFromString('Jc'), 10);
        });
        it('cfs-invalid-numeric-card', function () {
            try {
                cardUtils.cardFromString('12c');
            } catch (e) {
                assert.ok(true);
            }

        });
        it('cfs-invalid-face-card', function () {
            try {
                cardUtils.cardFromString('Yc');
                assert.ok(false);
            } catch (e) {
                assert.ok(true);
            }

        });

    });
    describe('handFromString', function () {
        // handFromString
        it('hfs-quad-2s', function () {
            assert.deepEqual(cardUtils.handFromString('2c 2d 2h 2s Ah'), [ 1, 14, 27, 40, 39 ]);
        });
        it('hfs-middle', function () {
            assert.deepEqual(cardUtils.handFromString('9c 8d 7h 10s Kh'), [ 8, 20, 32, 48, 38 ]);
        });
        it('hfs-low', function () {
            assert.deepEqual(cardUtils.handFromString('2c 3c 4c 5c 6c'), [ 1, 2, 3, 4, 5 ]);
        });
        it('hfs-wheel', function () {
            assert.deepEqual(cardUtils.handFromString('As 2s 3s 4s 5s'), [ 52, 40, 41, 42, 43 ]);
        });
        it('hfs-wrong-case-no-error', function () {
            assert.deepEqual(cardUtils.handFromString('3D 3c 3h Ad ac'), [ 15, 2, 28, 26, 13 ]);
        });
        it('hfs-invalid-length', function () {
            try {
                cardUtils.handFromString('3d 3c 3h Ad Ac 6c');
                assert.ok(false);
            } catch (e) {
                assert.ok(true);
            }

        });
    });

    describe('cardToString', function () {
        // cardToString
        it('cts-Ac', function () {
            assert.deepEqual(cardUtils.cardToString(13), 'Ac');
        });
        it('cts-As', function () {
            assert.deepEqual(cardUtils.cardToString(52), 'As');
        });
        it('cts-2d', function () {
            assert.deepEqual(cardUtils.cardToString(14), '2d');
        });
        it('cts-kd', function () {
            assert.deepEqual(cardUtils.cardToString(25), 'Kd');
        });
        it('cts-8s', function () {
            assert.deepEqual(cardUtils.cardToString(46), '8s');
        });
        it('cts-jc', function () {
            assert.deepEqual(cardUtils.cardToString(10), 'Jc');
        });
    });

    describe('handToString', function () {
        // handToString
        it('hts-quad-as', function () {
            assert.deepEqual(cardUtils.handToString([ 13, 26, 39, 52, 12 ]), 'Ac Ad Ah As Kc');
        });
        it('hts-quad-2s', function () {
            assert.deepEqual(cardUtils.handToString([ 1, 14, 27, 40, 39 ]), '2c 2d 2h 2s Ah');
        });
        it('hts-mid', function () {
            assert.deepEqual(cardUtils.handToString([  8, 20, 32, 48, 38  ]), '9c 8d 7h 10s Kh');
        });
        it('hts-high', function () {
            assert.deepEqual(cardUtils.handToString([  35, 49, 37, 12, 26 ]), '10h Js Qh Kc Ad');
        });

    });
    describe('cardToOutputString', function () {
        //cardToOutputString
        it('ctos-A', function () {
            assert.deepEqual(cardUtils.cardToOutputString(13), 'Ace');
        });
        it('ctos-K', function () {
            assert.deepEqual(cardUtils.cardToOutputString(12), 'King');
        });
        it('ctos-Q', function () {
            assert.deepEqual(cardUtils.cardToOutputString(11), 'Queen');
        });
        it('ctos-J', function () {
            assert.deepEqual(cardUtils.cardToOutputString(10), 'Jack');
        });
        it('ctos-10', function () {
            assert.deepEqual(cardUtils.cardToOutputString(9), 'Ten');
        });
        it('ctos-5', function () {
            assert.deepEqual(cardUtils.cardToOutputString(4), 'Five');
        });
        it('ctos-2', function () {
            assert.deepEqual(cardUtils.cardToOutputString(1), 'Two');
        });

    });
});


