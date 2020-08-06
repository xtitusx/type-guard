"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const array_guard_1 = require("../src/array-guard");
describe('Array-Guard', () => {
    describe('#isEmpty()', () => {
        it('should return true when tested value is []', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isEmpty().guard([]).isSuccess(), true);
        });
        it("should return false when tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isEmpty().guard(['foo']).isSuccess(), false);
        });
        it('should return false when tested value is null', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isEmpty().guard(null).isSuccess(), false);
        });
        it('should return false when tested value is undefined', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isEmpty().guard(undefined).isSuccess(), false);
        });
    });
    describe('#isNotEmpty()', () => {
        it("should return true when tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isNotEmpty().guard(['foo']).isSuccess(), true);
        });
        it('should return false when tested value is []', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isNotEmpty().guard([]).isSuccess(), false);
        });
        it('should return false when tested value is null', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isNotEmpty().guard(null).isSuccess(), false);
        });
        it('should return false when tested value is undefined', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().isNotEmpty().guard(undefined).isSuccess(), false);
        });
    });
    describe('#hasSize()', () => {
        it('should return true when param is 1 and tested value is [foo]', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasSize(1).guard(['foo']).isSuccess(), true);
        });
        it('should return true when param is 0 and tested value is []', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasSize(0).guard([]).isSuccess(), true);
        });
        it("should return false when param is 3 and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasSize(3).guard(['foo', 'bar']).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is null', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasSize(1).guard(null).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is undefined', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasSize(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#hasMinSize()', () => {
        it("should return true when param is 1 and tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMinSize(1).guard(['foo']).isSuccess(), true);
        });
        it("should return true when param is 1 and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMinSize(1).guard(['foo', 'bar']).isSuccess(), true);
        });
        it("should return false when param is 3 and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMinSize(3).guard(['foo', 'bar']).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is null', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMinSize(1).guard(null).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is undefined', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMinSize(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#hasMaxSize()', () => {
        it("should return true when param is 1 and tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMaxSize(1).guard(['foo']).isSuccess(), true);
        });
        it("should return true when param is 3 and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMaxSize(3).guard(['foo', 'bar']).isSuccess(), true);
        });
        it("should return false when param is 1 and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMaxSize(1).guard(['foo', 'bar']).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is null', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMaxSize(1).guard(null).isSuccess(), false);
        });
        it('should return false when param is 1 and tested value is undefined', () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().hasMaxSize(1).guard(undefined).isSuccess(), false);
        });
    });
    describe('#contains()', () => {
        it("should return true when param is 'foo' and tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foo').guard(['foo']).isSuccess(), true);
        });
        it("should return true when param is 'foo' and tested value is ['foo', 'bar']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foo').guard(['foo', 'bar']).isSuccess(), true);
        });
        it("should return false when param is 'foobar' and tested value is ['foo']", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foobar').guard(['foo']).isSuccess(), false);
        });
        it("should return false when param is 'foo' and tested value is []", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foo').guard([]).isSuccess(), false);
        });
        it("should return false when param 'foo' and tested value is null", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foo').guard(null).isSuccess(), false);
        });
        it("should return false when param 'foo' and tested value is undefined", () => {
            chai_1.assert.equal(new array_guard_1.ArrayGuard().contains('foo').guard(undefined).isSuccess(), false);
        });
    });
});
//# sourceMappingURL=array-guard-test.js.map