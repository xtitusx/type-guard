import { assert } from 'chai';

import { DateStringGuard } from '../../src/guards/date-string.guard';

describe('DateString-Guard', () => {
    describe('#guard()', () => {
        it("should return true when tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(new DateStringGuard().guard('2015-01-20T00:00:00+02:00').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            const guardResult = new DateStringGuard().guard(null);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'DateStringGuard expected a string but received: null');
        });

        it('should return false when tested value is undefined', () => {
            const guardResult = new DateStringGuard().guard(undefined);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'DateStringGuard expected a string but received: undefined');
        });

        it("should return false when tested value is 'foo'", () => {
            const guardResult = new DateStringGuard().guard('foo');
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'DateStringGuard expected a date string but received: string');
        });
    });

    describe('#isIso8601()', () => {
        it("should return true when tested value is '2015-01-20'", () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard('2015-01-20').isSuccess(), true);
        });

        it("should return true when tested value is '2021-02-28'", () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard('2021-02-28').isSuccess(), true);
        });
        it("should return false when tested value is '2021-02-29'", () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard('2021-02-29').isSuccess(), false);
        });

        it("should return false when tested value is '2015-01-19T22:00:00+00:00'", () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard('2015-01-19T22:00:00+00:00').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new DateStringGuard().isIso8601Date().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isRfc3339()', () => {
        it("should return true when tested value is '2019-10-12T07:20:50.52Z'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2019-10-12T07:20:50.52Z').isSuccess(), true);
        });

        it("should return true when tested value is '2019-10-12 07:20:50.52Z'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2019-10-12 07:20:50.52Z').isSuccess(), true);
        });

        it("should return true when tested value is '2015-01-19T22:00:00+00:00'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2015-01-19T22:00:00+00:00').isSuccess(), true);
        });

        it("should return true when tested value is '2015-01-19T22:00:00+00:00'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2015-01-19T22:00:00+00:00').isSuccess(), true);
        });

        it("should return true when tested value is '2015-01-19T22:00:00+12:00'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2015-01-19T22:00:00+12:00').isSuccess(), true);
        });

        it("should return true when tested value is '2015-01-19T22:00:00-12:00'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2015-01-19T22:00:00-12:00').isSuccess(), true);
        });

        it("should return true when tested value is '2015-01-19T22:00:00-01:00'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2015-01-19T22:00:00-01:00').isSuccess(), true);
        });

        it("should return false when tested value is '2021-02-29 07:20:50.52Z'", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('2021-02-29 07:20:50.52Z').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new DateStringGuard().isRfc3339().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new DateStringGuard().isRfc3339().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new DateStringGuard().isRfc3339().guard(undefined).isSuccess(), false);
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

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            assert.equal(
                new DateStringGuard().isSameOrAfter('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(),
                false
            );
        });

        it("should return true when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isBefore('2015-01-20T00:00:01+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isBefore('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isBefore('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:01+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isAfter('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:01+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isAfter('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return false when param is '2015-01-20T00:00:01+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isAfter('2015-01-20T00:00:01+02:00')
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
    });

    describe('#isSameOrBefore()', () => {
        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return true when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-19T22:00:00+00:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-19T22:00:00+00:00')
                    .isSuccess(),
                true
            );
        });

        it("should return true when param is '2015-01-20' and tested value is '2015-01-20'", () => {
            assert.equal(new DateStringGuard().isSame('2015-01-20').guard('2015-01-20').isSuccess(), true);
        });

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:01+02:00'", () => {
            assert.equal(
                new DateStringGuard()
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-19T22:00:01+02:00')
                    .isSuccess(),
                false
            );
        });

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

        it("should return false when param is '2015-01-20T00:00:00+02:00' and tested value is 'foo'", () => {
            assert.equal(
                new DateStringGuard().isSameOrBefore('2015-01-20T00:00:00+02:00').guard('foo').isSuccess(),
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
    });
});
