import { assert } from 'chai';

import { NumberGuard } from '../src/number-guard';

describe('Number-Guard', () => {
    describe('#equals()', () => {
        it('should return true when param is 1 and tested value is 1', () => {
            assert.equal(new NumberGuard().equals(1).guard(1).isSuccess(), true);
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
});
