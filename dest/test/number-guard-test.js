"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const number_guard_1 = require("../src/number-guard");
describe('Number-Guard', () => {
    describe('#equals()', () => {
        it('should return true when param is 1 and tested value is 1', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().equals(1).guard(1).isSuccess(), true);
        });
        it('should return false when param is 2 and tested value is 1', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().equals(2).guard(1).isSuccess(), false);
        });
        it('should return false when param 1 and tested value is null', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().equals(1).guard(null).isSuccess(), false);
        });
        it('should return false when param 1 and tested value is undefined', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().equals(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#isMin()', () => {
        it('should return true when param is 3 and tested value is 4', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(3).guard(4).isSuccess(), true);
        });
        it('should return true when param is 3 and tested value is 3', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(3).guard(3).isSuccess(), true);
        });
        it('should return false when param is 4 and tested value is 3', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(4).guard(3).isSuccess(), false);
        });
        it('should return false when param is 3 and tested value is "3"', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(3).guard('3').isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is null', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(1).guard(null).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is undefined', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#isMax()', () => {
        it('should return true when param is 4 and tested value is 3', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMax(4).guard(3).isSuccess(), true);
        });
        it('should return true when param is 3 and tested value is 3', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMax(3).guard(3).isSuccess(), true);
        });
        it('should return false when param is 3 and tested value is 4', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMax(3).guard(4).isSuccess(), false);
        });
        it('should return false when param is 3 and tested value is "3"', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMax(3).guard('3').isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is null', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMax(1).guard(null).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is undefined', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isMin(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#isIn()', () => {
        it('should return true when params are 1 and 3, and tested value is 2', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 3).guard(2).isSuccess(), true);
        });
        it('should return true when params are 1 and 3, and tested value is 1', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 3).guard(1).isSuccess(), true);
        });
        it('should return true when params are 1 and 3, and tested value is 3', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 3).guard(3).isSuccess(), true);
        });
        it('should return true when params are 1 and 1, and tested value is 1', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 1).guard(1).isSuccess(), true);
        });
        it('should return false when params are 1 and 1, and tested value is 2', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 1).guard(2).isSuccess(), false);
        });
        it('should return false when params are 1 and 3, and tested value is 4', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 3).guard(4).isSuccess(), false);
        });
        it('should return false when param  are 1 and 1, and tested value is null', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 1).guard(null).isSuccess(), false);
        });
        it('should return false when param  are 1 and 1, and tested value is undefined', () => {
            chai_1.assert.equal(new number_guard_1.NumberGuard().isIn(1, 1).guard(undefined).isSuccess(), false);
        });
    });
});
//# sourceMappingURL=number-guard-test.js.map