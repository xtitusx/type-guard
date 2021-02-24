import { assert } from 'chai';

import { NumberGuard } from '../../src/guards/number-guard';

describe('Number-Guard', () => {
    describe('#guard()', () => {
        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().guard(1).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            const guardResult = new NumberGuard().guard(null);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'NumberGuard expected a number but received: null');
        });

        it('should return false when tested value is undefined', () => {
            const guardResult = new NumberGuard().guard(undefined);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'NumberGuard expected a number but received: undefined');
        });

        it("should return false when tested value is 'foo''", () => {
            const guardResult = new NumberGuard().guard('foo');
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'NumberGuard expected a number but received: string');
        });
    });

    describe('#equals()', () => {
        it('should return true when param is 1 and tested value is 1', () => {
            assert.equal(new NumberGuard().equals(1).guard(1).isSuccess(), true);
        });

        it('should return true when param is 1.1 and tested value is 1.1', () => {
            assert.equal(new NumberGuard().equals(1.1).guard(1.1).isSuccess(), true);
        });

        it('should return false when param is 2 and tested value is 1', () => {
            assert.equal(new NumberGuard().equals(2).guard(1).isSuccess(), false);
        });

        it('should return false when param 1 and tested value is null', () => {
            assert.equal(new NumberGuard().equals(1).guard(null).isSuccess(), false);
        });

        it('should return false when param 1 and tested value is undefined', () => {
            assert.equal(new NumberGuard().equals(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isMin()', () => {
        it('should return true when param is 3 and tested value is 4', () => {
            assert.equal(new NumberGuard().isMin(3).guard(4).isSuccess(), true);
        });

        it('should return true when param is 3.1 and tested value is 4.1', () => {
            assert.equal(new NumberGuard().isMin(3.1).guard(4.1).isSuccess(), true);
        });

        it('should return true when param is 3 and tested value is 3', () => {
            assert.equal(new NumberGuard().isMin(3).guard(3).isSuccess(), true);
        });

        it('should return false when param is 4 and tested value is 3', () => {
            assert.equal(new NumberGuard().isMin(4).guard(3).isSuccess(), false);
        });

        it('should return false when param is 3 and tested value is "3"', () => {
            assert.equal(new NumberGuard().isMin(3).guard('3').isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new NumberGuard().isMin(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new NumberGuard().isMin(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isMax()', () => {
        it('should return true when param is 4 and tested value is 3', () => {
            assert.equal(new NumberGuard().isMax(4).guard(3).isSuccess(), true);
        });

        it('should return true when param is 4.1 and tested value is 3.1', () => {
            assert.equal(new NumberGuard().isMax(4.1).guard(3.1).isSuccess(), true);
        });

        it('should return true when param is 3 and tested value is 3', () => {
            assert.equal(new NumberGuard().isMax(3).guard(3).isSuccess(), true);
        });

        it('should return false when param is 3 and tested value is 4', () => {
            assert.equal(new NumberGuard().isMax(3).guard(4).isSuccess(), false);
        });

        it('should return false when param is 3 and tested value is "3"', () => {
            assert.equal(new NumberGuard().isMax(3).guard('3').isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new NumberGuard().isMax(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new NumberGuard().isMin(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isIn()', () => {
        it('should return true when params are 1 and 3, and tested value is 2', () => {
            assert.equal(new NumberGuard().isIn(1, 3).guard(2).isSuccess(), true);
        });

        it('should return true when params are 1.1 and 3.1, and tested value is 2.1', () => {
            assert.equal(new NumberGuard().isIn(1.1, 3.1).guard(2.1).isSuccess(), true);
        });

        it('should return true when params are 1 and 3, and tested value is 1', () => {
            assert.equal(new NumberGuard().isIn(1, 3).guard(1).isSuccess(), true);
        });

        it('should return true when params are 1 and 3, and tested value is 3', () => {
            assert.equal(new NumberGuard().isIn(1, 3).guard(3).isSuccess(), true);
        });

        it('should return true when params are 1 and 1, and tested value is 1', () => {
            assert.equal(new NumberGuard().isIn(1, 1).guard(1).isSuccess(), true);
        });

        it('should return false when params are 1 and 1, and tested value is 2', () => {
            assert.equal(new NumberGuard().isIn(1, 1).guard(2).isSuccess(), false);
        });

        it('should return false when params are 1 and 3, and tested value is 4', () => {
            assert.equal(new NumberGuard().isIn(1, 3).guard(4).isSuccess(), false);
        });

        it('should return false when param  are 1 and 1, and tested value is null', () => {
            assert.equal(new NumberGuard().isIn(1, 1).guard(null).isSuccess(), false);
        });

        it('should return false when param  are 1 and 1, and tested value is undefined', () => {
            assert.equal(new NumberGuard().isIn(1, 1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isPositive()', () => {
        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().isPositive().guard(1).isSuccess(), true);
        });

        it('should return true when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isPositive().guard(1.1).isSuccess(), true);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new NumberGuard().isPositive().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is -1', () => {
            assert.equal(new NumberGuard().isPositive().guard(-1).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isPositive().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isPositive().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNegative()', () => {
        it('should return true when tested value is -1', () => {
            assert.equal(new NumberGuard().isNegative().guard(-1).isSuccess(), true);
        });

        it('should return true when tested value is -1.1', () => {
            assert.equal(new NumberGuard().isNegative().guard(-1.1).isSuccess(), true);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new NumberGuard().isNegative().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new NumberGuard().isNegative().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isNegative().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isNegative().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isWhole()', () => {
        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().isWhole().guard(1).isSuccess(), true);
        });

        it('should return true when tested value is -1', () => {
            assert.equal(new NumberGuard().isWhole().guard(-1).isSuccess(), true);
        });

        it('should return true when tested value is 0', () => {
            assert.equal(new NumberGuard().isWhole().guard(0).isSuccess(), true);
        });

        it('should return false when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isWhole().guard(1.1).isSuccess(), false);
        });

        it('should return true when tested value is 1.0', () => {
            assert.equal(new NumberGuard().isWhole().guard(1.0).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isWhole().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isWhole().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isDecimal()', () => {
        it('should return true when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isDecimal().guard(1.1).isSuccess(), true);
        });

        it('should return true when tested value is -1.1', () => {
            assert.equal(new NumberGuard().isDecimal().guard(-1.1).isSuccess(), true);
        });

        it('should return true when tested value is 0.11', () => {
            assert.equal(new NumberGuard().isDecimal().guard(0.11).isSuccess(), true);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new NumberGuard().isDecimal().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is 1.0', () => {
            assert.equal(new NumberGuard().isDecimal().guard(1.0).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isDecimal().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isDecimal().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isEven()', () => {
        it('should return true when tested value is 0', () => {
            assert.equal(new NumberGuard().isEven().guard(0).isSuccess(), true);
        });

        it('should return true when tested value is 2', () => {
            assert.equal(new NumberGuard().isEven().guard(2).isSuccess(), true);
        });

        it('should return true when tested value is 4', () => {
            assert.equal(new NumberGuard().isEven().guard(4).isSuccess(), true);
        });

        it('should return true when tested value is -2', () => {
            assert.equal(new NumberGuard().isEven().guard(-2).isSuccess(), true);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new NumberGuard().isEven().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is 3', () => {
            assert.equal(new NumberGuard().isEven().guard(3).isSuccess(), false);
        });

        it('should return true when tested value is 2.1', () => {
            assert.equal(new NumberGuard().isEven().guard(2.1).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isEven().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isEven().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isOdd()', () => {
        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().isOdd().guard(1).isSuccess(), true);
        });

        it('should return true when tested value is 3', () => {
            assert.equal(new NumberGuard().isOdd().guard(3).isSuccess(), true);
        });

        it('should return true when tested value is 5', () => {
            assert.equal(new NumberGuard().isOdd().guard(5).isSuccess(), true);
        });

        it('should return true when tested value is -1', () => {
            assert.equal(new NumberGuard().isOdd().guard(-1).isSuccess(), true);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new NumberGuard().isOdd().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is 2', () => {
            assert.equal(new NumberGuard().isOdd().guard(2).isSuccess(), false);
        });

        it('should return false when tested value is 4', () => {
            assert.equal(new NumberGuard().isOdd().guard(4).isSuccess(), false);
        });

        it('should return true when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isOdd().guard(1.1).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isOdd().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isOdd().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isPrime()', () => {
        it('should return true when tested value is 2', () => {
            assert.equal(new NumberGuard().isPrime().guard(2).isSuccess(), true);
        });

        it('should return true when tested value is 3', () => {
            assert.equal(new NumberGuard().isPrime().guard(3).isSuccess(), true);
        });

        it('should return true when tested value is 5', () => {
            assert.equal(new NumberGuard().isPrime().guard(5).isSuccess(), true);
        });

        it('should return true when tested value is 7', () => {
            assert.equal(new NumberGuard().isPrime().guard(7).isSuccess(), true);
        });

        it('should return true when tested value is 11', () => {
            assert.equal(new NumberGuard().isPrime().guard(11).isSuccess(), true);
        });

        it('should return true when tested value is 13', () => {
            assert.equal(new NumberGuard().isPrime().guard(13).isSuccess(), true);
        });

        it('should return false when tested value is -1', () => {
            assert.equal(new NumberGuard().isPrime().guard(-1).isSuccess(), false);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new NumberGuard().isPrime().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new NumberGuard().isPrime().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isPrime().guard(1.1).isSuccess(), false);
        });

        it('should return false when tested value is 4', () => {
            assert.equal(new NumberGuard().isPrime().guard(4).isSuccess(), false);
        });

        it('should return false when tested value is 6', () => {
            assert.equal(new NumberGuard().isPrime().guard(6).isSuccess(), false);
        });

        it('should return false when tested value is 8', () => {
            assert.equal(new NumberGuard().isPrime().guard(8).isSuccess(), false);
        });

        it('should return false when tested value is 9', () => {
            assert.equal(new NumberGuard().isPrime().guard(9).isSuccess(), false);
        });

        it('should return false when tested value is 10', () => {
            assert.equal(new NumberGuard().isPrime().guard(10).isSuccess(), false);
        });

        it('should return false when tested value is 14', () => {
            assert.equal(new NumberGuard().isPrime().guard(14).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isPrime().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isPrime().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isComposite()', () => {
        it('should return true when tested value is 4', () => {
            assert.equal(new NumberGuard().isComposite().guard(4).isSuccess(), true);
        });

        it('should return true when tested value is 6', () => {
            assert.equal(new NumberGuard().isComposite().guard(6).isSuccess(), true);
        });

        it('should return true when tested value is 8', () => {
            assert.equal(new NumberGuard().isComposite().guard(8).isSuccess(), true);
        });

        it('should return true when tested value is 9', () => {
            assert.equal(new NumberGuard().isComposite().guard(9).isSuccess(), true);
        });

        it('should return true when tested value is 10', () => {
            assert.equal(new NumberGuard().isComposite().guard(10).isSuccess(), true);
        });

        it('should return true when tested value is 12', () => {
            assert.equal(new NumberGuard().isComposite().guard(12).isSuccess(), true);
        });

        it('should return true when tested value is 14', () => {
            assert.equal(new NumberGuard().isComposite().guard(14).isSuccess(), true);
        });

        it('should return false when tested value is -1', () => {
            assert.equal(new NumberGuard().isComposite().guard(-1).isSuccess(), false);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new NumberGuard().isComposite().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new NumberGuard().isComposite().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is 1.1', () => {
            assert.equal(new NumberGuard().isComposite().guard(1.1).isSuccess(), false);
        });

        it('should return false when tested value is 2', () => {
            assert.equal(new NumberGuard().isComposite().guard(2).isSuccess(), false);
        });

        it('should return false when tested value is 3', () => {
            assert.equal(new NumberGuard().isComposite().guard(3).isSuccess(), false);
        });

        it('should return false when tested value is 5', () => {
            assert.equal(new NumberGuard().isComposite().guard(5).isSuccess(), false);
        });

        it('should return false when tested value is 7', () => {
            assert.equal(new NumberGuard().isComposite().guard(7).isSuccess(), false);
        });

        it('should return false when tested value is 11', () => {
            assert.equal(new NumberGuard().isComposite().guard(11).isSuccess(), false);
        });

        it('should return false when tested value is 13', () => {
            assert.equal(new NumberGuard().isComposite().guard(13).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isComposite().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isComposite().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isFibonacci()', () => {
        it('should return true when tested value is 0', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(0).isSuccess(), true);
        });

        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(1).isSuccess(), true);
        });

        it('should return true when tested value is 2', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(2).isSuccess(), true);
        });

        it('should return true when tested value is 3', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(3).isSuccess(), true);
        });

        it('should return true when tested value is 5', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(5).isSuccess(), true);
        });

        it('should return true when tested value is 8', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(8).isSuccess(), true);
        });

        it('should return true when tested value is 13', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(21).isSuccess(), true);
        });

        it('should return true when tested value is 21', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(34).isSuccess(), true);
        });

        it('should return true when tested value is 55', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(55).isSuccess(), true);
        });

        it('should return true when tested value is 89', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(89).isSuccess(), true);
        });

        it('should return true when tested value is 144', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(144).isSuccess(), true);
        });

        it('should return true when tested value is 233', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(233).isSuccess(), true);
        });

        it('should return false when tested value is -1', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(-1).isSuccess(), false);
        });

        it('should return false when tested value is -3', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(-3).isSuccess(), false);
        });

        it('should return false when tested value is 4', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(4).isSuccess(), false);
        });

        it('should return false when tested value is 6', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(6).isSuccess(), false);
        });

        it('should return false when tested value is 7', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(7).isSuccess(), false);
        });

        it('should return false when tested value is 9', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(9).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNegaFibonacci()', () => {
        it('should return true when tested value is 0', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(0).isSuccess(), true);
        });

        it('should return true when tested value is 1', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(1).isSuccess(), true);
        });

        it('should return true when tested value is 2', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(2).isSuccess(), true);
        });

        it('should return true when tested value is 3', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(3).isSuccess(), true);
        });

        it('should return true when tested value is 5', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(5).isSuccess(), true);
        });

        it('should return true when tested value is 8', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(8).isSuccess(), true);
        });

        it('should return true when tested value is 13', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(21).isSuccess(), true);
        });

        it('should return true when tested value is 21', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(34).isSuccess(), true);
        });

        it('should return true when tested value is 55', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(55).isSuccess(), true);
        });

        it('should return true when tested value is 89', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(89).isSuccess(), true);
        });

        it('should return true when tested value is 144', () => {
            assert.equal(new NumberGuard().isFibonacci().guard(144).isSuccess(), true);
        });

        it('should return true when tested value is 233', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(233).isSuccess(), true);
        });

        it('should return true when tested value is -1', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(-1).isSuccess(), true);
        });

        it('should return true when tested value is -3', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(-3).isSuccess(), true);
        });

        it('should return false when tested value is -4', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(-4).isSuccess(), false);
        });

        it('should return false when tested value is 4', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(4).isSuccess(), false);
        });

        it('should return false when tested value is 6', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(6).isSuccess(), false);
        });

        it('should return false when tested value is 7', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(7).isSuccess(), false);
        });

        it('should return false when tested value is 9', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(9).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isNegaFibonacci().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNetworkPort()', () => {
        it("should return true when param is 'well-known' and tested value is 1", () => {
            assert.equal(new NumberGuard().isNetworkPort('well-known').guard(1).isSuccess(), true);
        });

        it("should return true when param is 'well-known' and tested value is 1023", () => {
            assert.equal(new NumberGuard().isNetworkPort('well-known').guard(1023).isSuccess(), true);
        });

        it("should return false when  param is 'well-known' and tested value is 1.1", () => {
            assert.equal(new NumberGuard().isNetworkPort('well-known').guard(1.1).isSuccess(), false);
        });

        it("should return false when param is 'well-known' and tested value is 0", () => {
            assert.equal(new NumberGuard().isNetworkPort('well-known').guard(0).isSuccess(), false);
        });

        it("should return false when param is 'well-known' and tested value is 1024", () => {
            assert.equal(new NumberGuard().isNetworkPort('well-known').guard(1024).isSuccess(), false);
        });

        it("should return true when param is 'registered' and tested value is 1024", () => {
            assert.equal(new NumberGuard().isNetworkPort('registered').guard(1024).isSuccess(), true);
        });

        it("should return true when param is 'registered' and tested value is 49151", () => {
            assert.equal(new NumberGuard().isNetworkPort('registered').guard(49151).isSuccess(), true);
        });

        it("should return false when  param is 'registered' and tested value is 1024.1", () => {
            assert.equal(new NumberGuard().isNetworkPort('registered').guard(1024.1).isSuccess(), false);
        });

        it("should return false when param is 'registered' and tested value is 1023", () => {
            assert.equal(new NumberGuard().isNetworkPort('registered').guard(1023).isSuccess(), false);
        });

        it("should return false when param is 'registered' and tested value is 49152", () => {
            assert.equal(new NumberGuard().isNetworkPort('registered').guard(49152).isSuccess(), false);
        });

        it("should return false when param is 'private' and tested value is 49152", () => {
            assert.equal(new NumberGuard().isNetworkPort('private').guard(49152).isSuccess(), true);
        });

        it("should return false when param is 'private' and tested value is 65535", () => {
            assert.equal(new NumberGuard().isNetworkPort('private').guard(65535).isSuccess(), true);
        });

        it("should return false when  param is 'private' and tested value is 49152.1", () => {
            assert.equal(new NumberGuard().isNetworkPort('private').guard(49152.1).isSuccess(), false);
        });

        it("should return false when param is 'private' and tested value is 49151", () => {
            assert.equal(new NumberGuard().isNetworkPort('private').guard(49151).isSuccess(), false);
        });

        it("should return false when param is 'private' and tested value is 65536", () => {
            assert.equal(new NumberGuard().isNetworkPort('private').guard(65536).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NumberGuard().isNetworkPort().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NumberGuard().isNetworkPort().guard(undefined).isSuccess(), false);
        });
    });
});
