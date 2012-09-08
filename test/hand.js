var handFactory = require('../lib/Hand'),
    assert = require('assert');

describe('handfactory', function () {
    describe('fromString', function () {
        // Straight Flush
        it('rank-sf-nor', function () {
            assert.equal(handFactory.fromString('3c 4c 2c 6c 5c').rank(), 'Straight Flush to the Six');
        });
        it('rank-sf-royal', function () {
            assert.equal(handFactory.fromString('10h Ah Kh Qh Jh').rank(), 'Straight Flush to the Ace');
        });
        it('rank-sf-wheel', function () {
            assert.equal(handFactory.fromString('2s As 4s 3s 5s').rank(), 'Straight Flush to the Five');
        });

        // Quads
        it('rank-quad-2s', function () {
            assert.equal(handFactory.fromString('2s 5s 2h 2d 2c').rank(), 'Quad Twos');
        });
        it('rank-quad-ks', function () {
            assert.equal(handFactory.fromString('Ks Kh 2s Kd Kc').rank(), 'Quad Kings');
        });
        it('rank-quad-as', function () {
            assert.equal(handFactory.fromString('As Ah 2s Ad Ac').rank(), 'Quad Aces');
        });


        // Boat
        it('rank-boat-2s3s', function () {
            assert.equal(handFactory.fromString('2s 3c 3d 2h 3s').rank(), 'Full House Threes over Twos');
        });
        it('rank-boat-AsKs', function () {
            assert.equal(handFactory.fromString('Ks Ac Kd Ah As').rank(), 'Full House Aces over Kings');
        });
        it('rank-boat-2sover3s', function () {
            assert.equal(handFactory.fromString('2s 3c 3d 2h 2s').rank(), 'Full House Twos over Threes');
        });

        // Flush
        it('rank-flush-s', function () {
            assert.equal(handFactory.fromString('2s 5s 8s 10s As').rank(), 'Flush - Ace High');
        });
        it('rank-flush-h', function () {
            assert.equal(handFactory.fromString('Kh 2h 10h Jh Ah').rank(), 'Flush - Ace High');
        });


        // Straight
        it('rank-straight-wheel', function () {
            assert.equal(handFactory.fromString('2s Ac 4d 3h 5s').rank(), 'Straight to the Five');
        });
        it('rank-straight-royal', function () {
            assert.equal(handFactory.fromString('Ks Ac Qd Jh 10s').rank(), 'Straight to the Ace');
        });
        it('rank-straight-mid', function () {
            assert.equal(handFactory.fromString('7s 4c 5d 6h 3s').rank(), 'Straight to the Seven');
        });

        // Trips
        it('rank-trip-2s-low', function () {
            assert.equal(handFactory.fromString('2s 2c 5d Ah 2s').rank(), 'Trip Twos');
        });
        it('rank-trip-5s-mid', function () {
            assert.equal(handFactory.fromString('6s 4c 5d 5h 5s').rank(), 'Trip Fives');
        });
        it('rank-trip-ks-high', function () {
            assert.equal(handFactory.fromString('6s kc 5d kh ks').rank(), 'Trip Kings');
        });

        // Pair
        it('rank-pair-2s', function () {
            assert.equal(handFactory.fromString('2s kc 5d qh 2s').rank(), 'Pair of Twos');
        });
        it('rank-pair-qs', function () {
            assert.equal(handFactory.fromString('qs 4c 5d qh As').rank(), 'Pair of Queens');
        });
        it('rank-pair-js', function () {
            assert.equal(handFactory.fromString('Jd Jh 2c 3h 5d').rank(), 'Pair of Jacks');
        });


        // 2 Pair
        it('rank-2pair-5q', function () {
            assert.equal(handFactory.fromString('qs kc 5d qh 5s').rank(), '2 Pair, Queens and Fives');
        });
        it('rank-2pair-kq', function () {
            assert.equal(handFactory.fromString('qs kc 5d qh ks').rank(), '2 Pair, Kings and Queens');
        });
        it('rank-2pair-a2', function () {
            assert.equal(handFactory.fromString('As 2c Ad qh 2s').rank(), '2 Pair, Aces and Twos');
        });

        // High Card
        it('rank-highcard-a', function () {
            assert.equal(handFactory.fromString('8s 2c kd qh 5s').rank(), 'High Card - King');
        });
        it('rank-highcard-6', function () {
            assert.equal(handFactory.fromString('10s 2c 3d 6h 5s').rank(), 'High Card - Ten');
        });
    });
});
