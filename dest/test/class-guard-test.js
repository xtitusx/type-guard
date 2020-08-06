"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const class_guard_1 = require("../src/class-guard");
describe('Class-Guard', () => {
    describe('#isInstanceOf()', () => {
        it('should return true when tested value is Number(1)', () => {
            chai_1.assert.equal(new class_guard_1.ClassGuard().isInstanceOf(Number).guard(new Number(1)).isSuccess(), true);
        });
        it('should return false when tested value is String("foo")', () => {
            chai_1.assert.equal(new class_guard_1.ClassGuard().isInstanceOf(Number).guard(new String('foo')).isSuccess(), false);
        });
        it('should return false when tested value is null', () => {
            chai_1.assert.equal(new class_guard_1.ClassGuard().isInstanceOf(Number).guard(null).isSuccess(), false);
        });
        it('should return false when tested value is undefined', () => {
            chai_1.assert.equal(new class_guard_1.ClassGuard().isInstanceOf(Number).guard(undefined).isSuccess(), false);
        });
    });
});
//# sourceMappingURL=class-guard-test.js.map