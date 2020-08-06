"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const date_string_guard_1 = require("../src/date-string-guard");
describe('DateString-Guard', () => {
    describe('#isSameOrBefore()', () => {
        it("should return true when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrBefore('2015-01-20T00:00:01+02:00')
                .guard('2015-01-20T00:00:00+02:00')
                .isSuccess(), true);
        });
        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrBefore('2015-01-20T00:00:00+02:00')
                .guard('2015-01-20T00:00:00+02:00')
                .isSuccess(), true);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrBefore('2015-01-20T00:00:00+02:00')
                .guard('2015-01-20T00:00:01+02:00')
                .isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is null", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard(null).isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is undefined", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard(undefined).isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(), false);
        });
    });
    describe('#isSameOrAfter()', () => {
        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrAfter('2015-01-20T00:00:00+02:00')
                .guard('2015-01-20T00:00:01+02:00')
                .isSuccess(), true);
        });
        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrAfter('2015-01-20T00:00:00+02:00')
                .guard('2015-01-20T00:00:00+02:00')
                .isSuccess(), true);
        });
        it("should return false when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard()
                .isSameOrAfter('2015-01-20T00:00:01+02:00')
                .guard('2015-01-20T00:00:00+02:00')
                .isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is null", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard(null).isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is undefined", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard(undefined).isSuccess(), false);
        });
        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            chai_1.assert.equal(new date_string_guard_1.DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(), false);
        });
    });
});
//# sourceMappingURL=date-string-guard-test.js.map