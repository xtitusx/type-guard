"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const boolean_guard_1 = require("../src/boolean-guard");
describe('Boolean-Guard', () => {
    describe('#isTrue()', () => {
        it('should return true when tested value is true', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard(true).isSuccess(), true);
        });
        it('should return false when tested value is false', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard(false).isSuccess(), false);
        });
        it("should return false when tested value is 'true'", () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard('true').isSuccess(), false);
        });
        it('should return false when tested value is 1', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard(1).isSuccess(), false);
        });
        it('should return false when tested value is null', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard(null).isSuccess(), false);
        });
        it('should return false when tested value is undefined', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isTrue().guard(undefined).isSuccess(), false);
        });
    });
    describe('#isFalse()', () => {
        it('should return true when tested value is false', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard(false).isSuccess(), true);
        });
        it('should return false when tested value is true', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard(true).isSuccess(), false);
        });
        it("should return false when tested value is 'false'", () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard('false').isSuccess(), false);
        });
        it('should return false when tested value is 0', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard(0).isSuccess(), false);
        });
        it('should return false when tested value is null', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard(null).isSuccess(), false);
        });
        it('should return false when tested value is undefined', () => {
            chai_1.assert.equal(new boolean_guard_1.BooleanGuard().isFalse().guard(undefined).isSuccess(), false);
        });
    });
});
//# sourceMappingURL=boolean-guard-test.js.map