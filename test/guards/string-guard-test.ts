import { assert } from 'chai';

import { StringGuard } from '../../src/guards/string-guard';

describe('String-Guard', () => {
    describe('#equals()', () => {
        it("should return true when param is 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foo').guard('foo').isSuccess(), true);
        });

        it("should return false when param is 'foobar' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foobar').guard('foo').isSuccess(), false);
        });

        it("should return true when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foobar').equals('foo').guard('foo').isSuccess(), true);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new StringGuard().equals('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new StringGuard().equals('foo').guard(undefined).isSuccess(), false);
        });
    });

    describe('#contains()', () => {
        it("should return true when param is 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().contains('foo').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'foo' and tested value is 'foobar'", () => {
            assert.equal(new StringGuard().contains('foo').guard('foobar').isSuccess(), true);
        });

        it("should return false when param is 'foobar' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().contains('foobar').guard('foo').isSuccess(), false);
        });

        it("should return false when param is 'foo' and tested value is ''", () => {
            assert.equal(new StringGuard().contains('foo').guard('').isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new StringGuard().contains('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new StringGuard().contains('foo').guard(undefined).isSuccess(), false);
        });
    });

    describe('#matches()', () => {
        it("should return true when param is '^foo$' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().matches(new RegExp('^foo$')).guard('foo').isSuccess(), true);
        });

        it("should return false when param is '^foobar' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().matches(new RegExp('^foobar')).guard('foo').isSuccess(), false);
        });

        it("should return false when param '^.*' and tested value is null", () => {
            assert.equal(new StringGuard().matches(new RegExp('^.*')).guard(null).isSuccess(), false);
        });

        it("should return false when param '^.*' and tested value is undefined", () => {
            assert.equal(new StringGuard().matches(new RegExp('^.*')).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isEmpty()', () => {
        it("should return true when tested value is ''", () => {
            assert.equal(new StringGuard().isEmpty().guard('').isSuccess(), true);
        });

        it("should return false when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isEmpty().guard('foo').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isEmpty().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isEmpty().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNotEmpty()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isNotEmpty().guard('foo').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isNotEmpty().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isNotEmpty().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isNotEmpty().guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasLength()', () => {
        it("should return true when param is 3 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasLength(3).guard('foo').isSuccess(), true);
        });

        it("should return true when param is 0 and tested value is ''", () => {
            assert.equal(new StringGuard().hasLength(0).guard('').isSuccess(), true);
        });

        it("should return false when param is 2 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasLength(2).guard('foo').isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new StringGuard().hasLength(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new StringGuard().hasLength(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasMinLength()', () => {
        it("should return true when param is 3 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasMinLength(3).guard('foo').isSuccess(), true);
        });

        it("should return true when param is 3 and tested value is 'foobar'", () => {
            assert.equal(new StringGuard().hasMinLength(3).guard('foobar').isSuccess(), true);
        });

        it("should return false when param is 4 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasMinLength(4).guard('foo').isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new StringGuard().hasMinLength(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new StringGuard().hasMinLength(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasMaxLength()', () => {
        it("should return true when param is 3 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasMaxLength(3).guard('foo').isSuccess(), true);
        });

        it("should return true when param is 4 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasMaxLength(4).guard('foo').isSuccess(), true);
        });

        it("should return false when param is 2 and tested value is 'foo'", () => {
            assert.equal(new StringGuard().hasMaxLength(2).guard('foo').isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new StringGuard().hasMaxLength(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new StringGuard().hasMaxLength(1).guard(undefined).isSuccess(), false);
        });
    });
});
