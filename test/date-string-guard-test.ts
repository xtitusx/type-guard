import { assert } from 'chai';

import { DateStringGuard } from '../src/date-string-guard';

describe('DateString-Guard', () => {
    describe('#isSameOrBefore()', () => {
        it("should return true when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrBefore('2015-01-20T00:00:01+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrBefore('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrBefore('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:01+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is null", () => {
            assert.equal(
                new DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard(null).isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is undefined", () => {
            assert.equal(
                new DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard(undefined).isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            assert.equal(
                new DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(),
                false
            );
        });
    });

    describe('#isSameOrAfter()', () => {
        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrAfter('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:01+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrAfter('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return false when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSameOrAfter('2015-01-20T00:00:01+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is null", () => {
            assert.equal(
                new DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard(null).isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is undefined", () => {
            assert.equal(
                new DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard(undefined).isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            assert.equal(
                new DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(),
                false
            );
        });
    });
});
