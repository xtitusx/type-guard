import { assert } from 'chai';

import { StringGuard } from '../../src/guards/string-guard';

describe('String-Guard', () => {
    describe('#guard()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().guard('foo').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            const guardResult = new StringGuard().guard(null);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'StringGuard expected a string but received: null');
        });

        it('should return false when tested value is undefined', () => {
            const guardResult = new StringGuard().guard(undefined);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'StringGuard expected a string but received: undefined');
        });

        it('should return false when tested value is 1', () => {
            const guardResult = new StringGuard().guard(1);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'StringGuard expected a string but received: number');
        });
    });

    describe('#equals()', () => {
        it("should return true when param is 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foo').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foobar').equals('foo').guard('foo').isSuccess(), true);
        });

        it("should return false when param is 'FOO' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('FOO').guard('foo').isSuccess(), false);
        });

        it("should return false when param is 'f' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('f').guard('foo').isSuccess(), false);
        });

        it("should return false when param is 'foobar' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foo').equals('foobar').guard('foo').isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new StringGuard().equals('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new StringGuard().equals('foo').guard(undefined).isSuccess(), false);
        });
    });

    describe('#notEquals()', () => {
        it("should return true when param is 'foobar' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().notEquals('foobar').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'foo ' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().notEquals('foo ').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'FOO' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().notEquals('FOO').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'f' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().notEquals('f').guard('foo').isSuccess(), true);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new StringGuard().notEquals('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new StringGuard().notEquals('foo').guard(undefined).isSuccess(), false);
        });
    });

    describe('#contains()', () => {
        it("should return true when param is 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().contains('foo').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'foo' and tested value is 'foobar'", () => {
            assert.equal(new StringGuard().contains('foo').guard('foobar').isSuccess(), true);
        });

        it("should return true when param is '' and tested value is ''", () => {
            assert.equal(new StringGuard().contains('').guard('').isSuccess(), true);
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

    describe('#notContains()', () => {
        it("should return true when param is 'foo' and tested value is 'bar'", () => {
            assert.equal(new StringGuard().notContains('foo').guard('bar').isSuccess(), true);
        });

        it("should return true when param is 'foobar' and tested value is 'fooba'", () => {
            assert.equal(new StringGuard().notContains('foobar').guard('fooba').isSuccess(), true);
        });

        it("should return true when param is 'Foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().notContains('Foo').guard('foo').isSuccess(), true);
        });

        it("should return true when param is 'foo' and tested value is ''", () => {
            assert.equal(new StringGuard().notContains('foo').guard('').isSuccess(), true);
        });

        it("should return false when param is 'foo' and tested value is 'foobar'", () => {
            assert.equal(new StringGuard().notContains('foo').guard('foobar').isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new StringGuard().notContains('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new StringGuard().notContains('foo').guard(undefined).isSuccess(), false);
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

    describe('#isUpperCase()', () => {
        it("should return true when tested value is 'FOO'", () => {
            assert.equal(new StringGuard().isUpperCase().guard('FOO').isSuccess(), true);
        });

        it("should return true when tested value is 'FOO1'", () => {
            assert.equal(new StringGuard().isUpperCase().guard('FOO1').isSuccess(), true);
        });

        it("should return true when tested value is 'FOO1 ='", () => {
            assert.equal(new StringGuard().isUpperCase().guard('FOO1 =').isSuccess(), true);
        });

        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isUpperCase().guard('1').isSuccess(), true);
        });

        it("should return false when tested value is 'Foo'", () => {
            assert.equal(new StringGuard().isUpperCase().guard('Foo').isSuccess(), false);
        });

        it("should return false when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isUpperCase().guard('foo').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isUpperCase().guard(null).isSuccess(), false);
        });

        it('should return false tested value is undefined', () => {
            assert.equal(new StringGuard().isUpperCase().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isLowerCase()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('foo').isSuccess(), true);
        });

        it("should return true when tested value is 'foo1'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('foo1').isSuccess(), true);
        });

        it("should return true when tested value is 'foo1 ='", () => {
            assert.equal(new StringGuard().isLowerCase().guard('foo1 =').isSuccess(), true);
        });

        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('1').isSuccess(), true);
        });

        it("should return false when tested value is 'Foo'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('Foo').isSuccess(), false);
        });

        it("should return false when tested value is 'FOO'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('FOO').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isLowerCase().guard(null).isSuccess(), false);
        });

        it('should return false tested value is undefined', () => {
            assert.equal(new StringGuard().isLowerCase().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isTrimmed()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isTrimmed().guard('foo').isSuccess(), true);
        });

        it("should return true when tested value is 'foo bar'", () => {
            assert.equal(new StringGuard().isTrimmed().guard('foo bar').isSuccess(), true);
        });

        it("should return true when tested value is ''", () => {
            assert.equal(new StringGuard().isTrimmed().guard('').isSuccess(), true);
        });

        it("should return false when tested value is ' foo'", () => {
            assert.equal(new StringGuard().isTrimmed().guard(' foo').isSuccess(), false);
        });

        it("should return false when tested value is 'foo '", () => {
            assert.equal(new StringGuard().isTrimmed().guard('foo ').isSuccess(), false);
        });

        it("should return false when tested value is ' foo '", () => {
            assert.equal(new StringGuard().isTrimmed().guard(' foo ').isSuccess(), false);
        });

        it("should return false when tested value is ' '", () => {
            assert.equal(new StringGuard().isTrimmed().guard(' ').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isTrimmed().guard(null).isSuccess(), false);
        });

        it('should return false tested value is undefined', () => {
            assert.equal(new StringGuard().isTrimmed().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isAlphaNumeric()', () => {
        it("should return true when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo').isSuccess(), true);
        });

        it("should return true when tested value is 'foo1'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo1').isSuccess(), true);
        });

        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('1').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('').isSuccess(), false);
        });

        it("should return false when tested value is 'foo '", () => {
            assert.equal(new StringGuard().isAlphaNumeric().guard('foo ').isSuccess(), false);
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

        it("should return false when tested value is '123 '", () => {
            assert.equal(new StringGuard().isNumeric().guard('123 ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isNumeric().guard('').isSuccess(), false);
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

    describe('#isDecimal()', () => {
        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1').isSuccess(), true);
        });

        it("should return true when tested value is '1234567890'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1234567890').isSuccess(), true);
        });

        it("should return true when tested value is '-1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('-1').isSuccess(), true);
        });

        it("should return true when tested value is '1.0'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1.0').isSuccess(), true);
        });

        it("should return true when tested value is '1,0'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1,0').isSuccess(), true);
        });

        it("should return true when tested value is '1.1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1.1').isSuccess(), true);
        });

        it("should return true when tested value is '-1.1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('-1.1').isSuccess(), true);
        });

        it("should return false when tested value is '1..1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1..1').isSuccess(), false);
        });

        it("should return false when tested value is '1.'", () => {
            assert.equal(new StringGuard().isDecimal().guard('1.').isSuccess(), false);
        });

        it("should return false when tested value is 'foo'", () => {
            assert.equal(new StringGuard().isDecimal().guard('foo').isSuccess(), false);
        });

        it("should return false when tested value is '123 '", () => {
            assert.equal(new StringGuard().isDecimal().guard('123 ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isDecimal().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isDecimal().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isDecimal().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isEmailAddress()', () => {
        describe("#isEmailAddress('quick')", () => {
            it("should return true when tested value is 'simple@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('quick').guard('simple@example.com').isSuccess(), true);
            });

            it("should return true when tested value is 'very.common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'very_common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very_common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'very-common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very-common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'very.common@example.info'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.info').isSuccess(),
                    true
                );
            });

            it("should return false when tested value is 'very.common@example.education'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.education').isSuccess(),
                    false
                );
            });

            it("should return false when tested value is ''", () => {
                assert.equal(new StringGuard().isEmailAddress().guard('').isSuccess(), false);
            });

            it('should return false when tested value is null', () => {
                assert.equal(new StringGuard().isEmailAddress().guard(null).isSuccess(), false);
            });

            it('should return false when tested value is undefined', () => {
                assert.equal(new StringGuard().isEmailAddress().guard(undefined).isSuccess(), false);
            });
        });

        describe("#isEmailAddress('rfc5322')", () => {
            it("should return true when tested value is 'simple@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('simple@example.com').isSuccess(), true);
            });

            it("should return true when tested value is 'simPle@eXample.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('simPle@eXample.com').isSuccess(), true);
            });

            it("should return true when tested value is 'very.common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('very.common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'disposable.style.email.with+symbol@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('disposable.style.email.with+symbol@example.com')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'other.email-with-hyphen@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('other.email-with-hyphen@example.com')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'fully-qualified-domain@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('fully-qualified-domain@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'user.name+tag+sorting@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('user.name+tag+sorting@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'x@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('x@example.com').isSuccess(), true);
            });

            it("should return true when tested value is 'example-indeed@strange-example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('example-indeed@strange-example.com').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'mailhost!username@example.org'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('mailhost!username@example.org').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'user%example.com@example.org'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('user%example.com@example.org').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'user-@example.org'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('user-@example.org').isSuccess(), true);
            });

            // Syntax using double quotes and square brackets not allowed.
            it('should return false when tested value is \'" "@example.org\'', () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('" "@example.org').isSuccess(), false);
            });

            // Syntax using double quotes and square brackets not allowed.
            it('should return false when tested value is \'"john..doe"@example.org\'', () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('"john..doe"@example.org').isSuccess(),
                    false
                );
            });

            // No @ character.
            it("should return false when tested value is 'Abc.example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('Abc.example.com').isSuccess(), false);
            });

            // Only one @ is allowed outside quotation marks.
            it("should return false when tested value is 'A@b@c@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('A@b@c@example.com').isSuccess(), false);
            });

            // None of the special characters in this local-part are allowed outside quotation marks.
            it("should return false when tested value is 'a\"b(c)d,e:f;g<h>i[jk]l@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('a"b(c)d,e:f;g<h>i[jk]l@example.com').isSuccess(),
                    false
                );
            });

            // Quoted strings must be dot separated or the only element making up the local-part.
            it('should return false when tested value is \'just"not"right@example.com\'', () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('just"not"right@example.com').isSuccess(),
                    false
                );
            });

            // Spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash.
            it("should return false when tested value is 'this is\"not\\allowed@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('this is"not\\allowed@example.com').isSuccess(),
                    false
                );
            });

            // Even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes.
            it("should return false when tested value is 'this\\ still\\\"not\\\\allowed@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('this\\ still\\"not\\\\allowed@example.com')
                        .isSuccess(),
                    false
                );
            });

            // Underscore is not allowed in domain part.
            it("should return false when tested value is 'i_like_underscore@but_its_not_allowed_in_this_part.example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('i_like_underscore@but_its_not_allowed_in_this_part.example.com')
                        .isSuccess(),
                    false
                );
            });

            it("should return false when tested value is ''", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('').isSuccess(), false);
            });

            it('should return false when tested value is null', () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard(null).isSuccess(), false);
            });

            it('should return false when tested value is undefined', () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard(undefined).isSuccess(), false);
            });
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

        it("should return true when tested value is '507F1F77BCF86CD7994390112'", () => {
            assert.equal(new StringGuard().isObjectId().guard('507F1F77BCF86CD7994390112').isSuccess(), false);
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

        describe('#isHexColor(3)', () => {
            it("should return true when param is 3 and tested value is '#000'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('#000').isSuccess(), true);
            });

            it("should return true when param is 3 and tested value is '#FFF'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('#FFF').isSuccess(), true);
            });

            it("should return true when param is 3 and tested value is '#aa3'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('#aa3').isSuccess(), true);
            });

            it("should return false when param is 3 and tested value is '000'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('000').isSuccess(), false);
            });

            it("should return false when param is 3 and tested value is '#AA33'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('#AA33').isSuccess(), false);
            });

            it("should return false when param is 3 and tested value is '#000000'", () => {
                assert.equal(new StringGuard().isHexColor(3).guard('000000').isSuccess(), false);
            });
        });

        describe('#isHexColor(6)', () => {
            it("should return true when param is 6 and tested value is '#000000'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#000000').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#FFFFFF'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#FFFFFF').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#AA33FF'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#AA33FF').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#aa33ff'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#aa33ff').isSuccess(), true);
            });

            it("should return false when param is 6 and tested value is '000000'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('000000').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA33FFA'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#AA33FFA').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA3'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('#AA3').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA33FG'", () => {
                assert.equal(new StringGuard().isHexColor(6).guard('AA33FG').isSuccess(), false);
            });
        });
    });

    describe('#isUuidv4()', () => {
        it("should return true when tested value is '9b8d710e-8a83-4a6f-ac58-500ab7e4d302'", () => {
            assert.equal(new StringGuard().isUuidv4().guard('9b8d710e-8a83-4a6f-ac58-500ab7e4d302').isSuccess(), true);
        });

        it("should return false when tested value is '9B8D710E-8A83-4A6F-aC58-500AB7E4D302'", () => {
            assert.equal(new StringGuard().isUuidv4().guard('9B8D710E-8A83-4A6F-aC58-500AB7E4D302').isSuccess(), false);
        });

        it("should return false when tested value is '123e4567-e89b-12d3-a456-426614174000'", () => {
            assert.equal(new StringGuard().isUuidv4().guard('123e4567-e89b-12d3-a456-426614174000').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isUuidv4().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isUuidv4().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isUuidv4().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isMACAddress()', () => {
        it("should return true when tested value is '00-0A-95-9D-68-16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00-0A-95-9D-68-16').isSuccess(), true);
        });

        it("should return true when tested value is '00:0a:95:9d:68:16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00:0a:95:9d:68:16').isSuccess(), true);
        });

        it("should return false when tested value is '00-0a-95-9d-68-16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00-0a-95-9d-68-16').isSuccess(), false);
        });

        it("should return false when tested value is '00:0A:95:9D:68:16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00:0A:95:9D:68:16').isSuccess(), false);
        });

        it("should return false when tested value is '00-0A-95-9G-68-16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00-0A-95-9G-68-16').isSuccess(), false);
        });

        it("should return false when tested value is ''00:0a:95:9d:68:1'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00:0a:95:9d:68:1').isSuccess(), false);
        });

        it("should return false when testedvalue is '000a959d6816'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('000a959d6816').isSuccess(), false);
        });

        it("should return false when tested value is '00:0a:95:9d:68-16'", () => {
            assert.equal(new StringGuard().isMACAddress().guard('00:0a:95:9d:68-16').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isMACAddress().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isMACAddress().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isMACAddress().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isIPAddress()', () => {
        it("should return true when tested value is '10.0.0.0'", () => {
            assert.equal(new StringGuard().isIPAddress().guard('10.0.0.0').isSuccess(), true);
        });

        it("should return true when tested value is '1:2:3:4:5:6:7:8'", () => {
            assert.equal(new StringGuard().isIPAddress().guard('1:2:3:4:5:6:7:8').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIPAddress().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIPAddress().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIPAddress().guard(undefined).isSuccess(), false);
        });

        describe('#isIPAddress(4)', () => {
            it("should return true when param is 4 and tested value is '0.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('0.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '10.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('10.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '127.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('127.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '192.168.0.1'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('192.168.0.1').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '224.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('224.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '255.255.255.255'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('255.255.255.255').isSuccess(), true);
            });

            it("should return false when param is 4 and tested value is '010.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('010.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is '001.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('001.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is 'x127.0.0.0'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('x127.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is '127.0.0.0x'", () => {
                assert.equal(new StringGuard().isIPAddress(4).guard('127.0.0.0x').isSuccess(), false);
            });
        });

        describe('#isIPAddress(6)', () => {
            it("should return true when param is 6 and tested value is '1:2:3:4:5:6:7:8'", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1:2:3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::'", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::8'", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::7:8'", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::6:7:8", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::5:6:7:8", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::4:5:6:7:8", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::3:4:5:6:7:8", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('1::3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '::2:3:4:5:6:7:8", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('::2:3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is 'fe80::7:8%eth0", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('fe80::7:8%eth0').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '::255.255.255.255", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('::255.255.255.255').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '2001:db8:3:4::192.0.2.33", () => {
                assert.equal(new StringGuard().isIPAddress(6).guard('2001:db8:3:4::192.0.2.33').isSuccess(), true);
            });
        });
    });
});
