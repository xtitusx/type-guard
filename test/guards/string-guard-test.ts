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

    describe('#isAlphaNumeric()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('').isSuccess(), false);
        });

        it("should return false when tested value is 'foo '", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo ').isSuccess(), false);
        });

        it("should return false when tested value is 'foo1'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo1').isSuccess(), true);
        });

        it("should return false when tested value is 'foo$'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo$').isSuccess(), false);
        });

        it("should return false when tested value is 'foo\\'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo\\').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isAlpha()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isAlpha().guard('foo').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isAlpha().guard('').isSuccess(), false);
        });

        it("should return false when tested value is 'foo '", () => {
            assert.equal(new StringGuard().isAlpha().guard('foo ').isSuccess(), false);
        });

        it("should return false when tested value is 'foo1'", () => {
            assert.equal(new StringGuard().isAlpha().guard('foo1').isSuccess(), false);
        });

        it("should return false when tested value is 'foo$'", () => {
            assert.equal(new StringGuard().isAlpha().guard('foo$').isSuccess(), false);
        });

        it("should return false when tested value is 'foo\\'", () => {
            assert.equal(new StringGuard().isAlpha().guard('foo\\').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isAlpha().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNumeric()', () => {
        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isNumeric().guard('1').isSuccess(), true);
        });

        it("should return true when tested value is '1234567890'", () => {
            assert.equal(new StringGuard().isNumeric().guard('1234567890').isSuccess(), true);
        });

        it("should return false when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isNumeric().guard('foo').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isNumeric().guard('').isSuccess(), false);
        });

        it("should return false when tested value is '123 '", () => {
            assert.equal(new StringGuard().isNumeric().guard('123 ').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isNumeric().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isNumeric().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isHex()', () => {
        it("should return true when tested value is '5'", () => {
            assert.equal(new StringGuard().isHex().guard('51').isSuccess(), true);
        });

        it("should return true when tested value is '507f1'", () => {
            assert.equal(new StringGuard().isHex().guard('507f1').isSuccess(), true);
        });

        it("should return true when tested value is '507F1'", () => {
            assert.equal(new StringGuard().isHex().guard('507F1').isSuccess(), true);
        });

        it("should return true when tested value is '112345679065574883030833'", () => {
            assert.equal(new StringGuard().isHex().guard('112345679065574883030833').isSuccess(), true);
        });

        it("should return true when tested value is 'FFFFFFFFFFFFFFFFFFFFFFFF'", () => {
            assert.equal(new StringGuard().isHex().guard('FFFFFFFFFFFFFFFFFFFFFFFF').isSuccess(), true);
        });

        it("should return false when tested value is '507f1f77bcf86cd79943901g'", () => {
            assert.equal(new StringGuard().isHex().guard('507f1f77bcf86cd79943901g').isSuccess(), false);
        });

        it("should return false when tested value is '507f1f77bcf86cd799439011 '", () => {
            assert.equal(new StringGuard().isHex().guard('507f1f77bcf86cd799439011 ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isHex().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isHex().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isHex().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isObjectId()', () => {
        it("should return true when tested value is '507f1f77bcf86cd799439011'", () => {
            assert.equal(new StringGuard().isObjectId().guard('507f1f77bcf86cd799439011').isSuccess(), true);
        });

        it("should return true when tested value is '507F1F77BCF86CD799439011'", () => {
            assert.equal(new StringGuard().isObjectId().guard('507F1F77BCF86CD799439011').isSuccess(), true);
        });

        it("should return true when tested value is '112345679065574883030833'", () => {
            assert.equal(new StringGuard().isObjectId().guard('112345679065574883030833').isSuccess(), true);
        });

        it("should return true when tested value is 'FFFFFFFFFFFFFFFFFFFFFFFF'", () => {
            assert.equal(new StringGuard().isObjectId().guard('FFFFFFFFFFFFFFFFFFFFFFFF').isSuccess(), true);
        });

        it("should return false when tested value is '507f1f77bcf86cd79943901'", () => {
            assert.equal(new StringGuard().isObjectId().guard('507f1f77bcf86cd79943901').isSuccess(), false);
        });

        it("should return false when tested value is '507f1f77bcf86cd79943901g'", () => {
            assert.equal(new StringGuard().isObjectId().guard('507f1f77bcf86cd79943901g').isSuccess(), false);
        });

        it("should return false when tested value is '507f1f77bcf86cd799439011 '", () => {
            assert.equal(new StringGuard().isObjectId().guard('507f1f77bcf86cd799439011 ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isObjectId().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isObjectId().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isObjectId().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isHexColor()', () => {
        it("should return true when tested value is '#000'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('#000').isSuccess(), true);
        });

        it("should return true when tested value is '#FFF'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('#FFF').isSuccess(), true);
        });

        it("should return true when tested value is '#aa3'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('#aa3').isSuccess(), true);
        });

        it("should return false when tested value is '000'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('000').isSuccess(), false);
        });

        it("should return false when tested value is '#AA33'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('#AA33').isSuccess(), false);
        });

        it("should return false when tested value is '#000000'", () => {
            assert.equal(new StringGuard().isHexColor(3).guard('000000').isSuccess(), false);
        });

        it("should return true when tested value is '#000000'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#000000').isSuccess(), true);
        });

        it("should return true when tested value is '#FFFFFF'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#FFFFFF').isSuccess(), true);
        });

        it("should return true when tested value is '#AA33FF'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#AA33FF').isSuccess(), true);
        });

        it("should return true when tested value is '#aa33ff'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#aa33ff').isSuccess(), true);
        });

        it("should return false when tested value is '000000'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('000000').isSuccess(), false);
        });

        it("should return false when tested value is '#AA33FFA'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#AA33FFA').isSuccess(), false);
        });

        it("should return false when tested value is '#AA3'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('#AA3').isSuccess(), false);
        });

        it("should return false when tested value is '#AA33FG'", () => {
            assert.equal(new StringGuard().isHexColor(6).guard('AA33FG').isSuccess(), false);
        });

        it("should return true when tested value is '#000'", () => {
            assert.equal(new StringGuard().isHexColor().guard('#000').isSuccess(), true);
        });

        it("should return true when tested value is '#000000'", () => {
            assert.equal(new StringGuard().isHexColor().guard('#000000').isSuccess(), true);
        });

        it("should return false when tested value is '#AA33'", () => {
            assert.equal(new StringGuard().isHexColor().guard('#AA33').isSuccess(), false);
        });

        it("should return false when tested value is '#AA33FFA'", () => {
            assert.equal(new StringGuard().isHexColor().guard('#AA33FFA').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isHexColor().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isHexColor().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isHexColor().guard(undefined).isSuccess(), false);
        });
    });
});
