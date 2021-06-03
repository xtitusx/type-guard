import { assert } from 'chai';

import { StringGuard } from '../../src/guards/string.guard';

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

    describe('#equals()', () => {
        it("should return true when param is 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foo').guard('foo').isSuccess(), true);
        });

        it("should return false when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(new StringGuard().equals('foobar').equals('foo').guard('foo').isSuccess(), false);
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

    describe('#isAlpha()', () => {
        it("should return true when tested value is 'abcdefghijklmnopqrstwxyz'", () => {
            assert.equal(new StringGuard().isAlpha().guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
        });

        it("should return true when tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
            assert.equal(new StringGuard().isAlpha().guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
        });

        it("should return true when tested value is 'Á'", () => {
            assert.equal(new StringGuard().isAlpha().guard('Á').isSuccess(), false);
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

        describe("#isAlpha('basic-latin')", () => {
            it("should return true when param is 'basic-latin' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(
                    new StringGuard().isAlpha('basic-latin').guard('abcdefghijklmnopqrstwxyz').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'basic-latin' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(
                    new StringGuard().isAlpha('basic-latin').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(),
                    true
                );
            });

            it("should return false when param is 'basic-latin' and tested value is 'Áá'", () => {
                assert.equal(new StringGuard().isAlpha('basic-latin').guard('Áá').isSuccess(), false);
            });

            it("should return false when param is 'basic-latin' and tested value is '0123456789+-*/,?;.:/!§&é~\"#'{([-|è`_ç^à@)]=}¨$£%ùµ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&é~"#\'{([-|è`_ç^à@)]=}¨$£%ùµ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('basic-latin').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('precomposed-latin')", () => {
            it("should return true when param is 'precomposed-latin' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('abcdefghijklmnopqrstwxyz').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains german characters 'äÖöÜüẞß'", () => {
                assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('äÖöÜüẞß').isSuccess(), true);
            });

            it("should return true when param is 'precomposed-latin' and tested value contains french characters 'àâæçéèêëîïôœùûüÿ'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('àâæçéèêëîïôœùûüÿ').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains french characters 'ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains icelandic characters 'ÀàÉéÈèÍíÌìÎîÓóÒòÚúÙù'", () => {
                assert.equal(
                    new StringGuard()
                        .isAlpha('precomposed-latin')
                        .guard('AaÁáBbDdÐðEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóPpRrSsTtUuÚúVvXxYyÝýÞþÆæÖö')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains italian characters 'ÀàÉéÈèÍíÌìÎîÓóÒòÚúÙù'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('ÀàÉéÈèÍíÌìÎîÓóÒòÚúÙù').isSuccess(),
                    true
                );
            });
            it("should return true when param is 'precomposed-latin' and tested value contains norwegian characters 'ÀàÉéÈèÍíÌìÎîÓóÒòÚúÙù'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('ÆæØøÅåÉéÈèÊêÓóÒòÂâÔôŪūĀāĒē').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains portuguese characters 'ÁáÀàÂâÃãÉéÊêÈèÍíÌìÓóÔôÕõÒòÚúÙù'", () => {
                assert.equal(
                    new StringGuard().isAlpha('precomposed-latin').guard('ÁáÀàÂâÃãÉéÊêÈèÍíÌìÓóÔôÕõÒòÚúÙù').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'precomposed-latin' and tested value contains spanish characters 'ñÑ'", () => {
                assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ñÑ').isSuccess(), true);
            });

            it("should return true when param is 'precomposed-latin' and tested value is breton trigram 'CʼH'", () => {
                assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('CʼH').isSuccess(), true);
            });

            it("should return true when param is 'precomposed-latin' and tested value is breton trigram 'Cʼh'", () => {
                assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Cʼh').isSuccess(), true);
            });

            it("should return true when param is 'precomposed-latin' and tested value is breton trigram 'cʼh'", () => {
                assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('cʼh').isSuccess(), true);
            });

            it("should return false when param is 'precomposed-latin' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>ʼ", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>ʼ';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(
                        new StringGuard().isAlpha('precomposed-latin').guard(str.charAt(pos)).isSuccess(),
                        false
                    );
                }
            });

            describe("#isAlpha('precomposed-latin') acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Áá'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Áá').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǽǽ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǽǽ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ćć'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ćć').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Éé'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Éé').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǵǵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǵǵ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Íí'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Íí').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḱḱ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḱḱ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĺĺ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĺĺ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḿḿ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḿḿ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ńń'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ńń').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Óó'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Óó').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǿǿ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǿǿ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṕṕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṕṕ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŕŕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŕŕ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Śś'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Śś').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Úú'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Úú').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẃẃ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẃẃ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ýý'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ýý').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Źź'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Źź').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and dot above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṥṥ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṥṥ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ăă'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ăă').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĕĕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĕĕ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ğğ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ğğ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĭĭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĭĭ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŏŏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŏŏ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŭŭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŭŭ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ắắ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ắắ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and dot below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ặặ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ặặ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ằằ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ằằ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and hook above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ẳẳ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẳẳ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and hook above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ẵẵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẵẵ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') breve and breve below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḫḫ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḫḫ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') caron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǎǎ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǎǎ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Čč'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Čč').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ďď'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ďď').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ěě'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ěě').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǧǧ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǧǧ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȟȟ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȟȟ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǐǐ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǐǐ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'ǰ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ǰ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǩǩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǩǩ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ľľ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ľľ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ňň'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ňň').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǒǒ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǒǒ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Řř'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Řř').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Šš'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Šš').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ťť'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ťť').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǔǔ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǔǔ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Žž'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Žž').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǯǯ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǯǯ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') caron and dot above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṧṧ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṧṧ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') cedilla", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Çç'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Çç').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḑḑ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḑḑ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȩȩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȩȩ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ģģ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ģģ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḩḩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḩḩ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ķķ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ķķ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ļļ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ļļ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ņņ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ņņ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŗŗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŗŗ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Şş'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Şş').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ţţ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ţţ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') cedilla and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḉḉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḉḉ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') cedilla and breve", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḝḝ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḝḝ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ââ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ââ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĉĉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĉĉ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Êê'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Êê').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĝĝ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĝĝ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĥĥ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĥĥ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Îî'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Îî').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĵĵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĵĵ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ôô'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ôô').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŝŝ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŝŝ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ûû'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ûû').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŵŵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŵŵ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ŷŷ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ŷŷ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẑẑ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẑẑ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ấấ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ấấ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ếế'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ếế').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ốố'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ốố').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex and dot below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ậậ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ậậ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ệệ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ệệ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ộộ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ộộ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex and grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ầầ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ầầ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ềề'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ềề').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ồồ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ồồ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex and hook above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ẩẩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẩẩ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ểể'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ểể').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ổổ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ổổ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex and tilde", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ẫẫ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẫẫ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ễễ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ễễ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỗỗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỗỗ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') circumflex below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḓḓ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḓḓ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḙḙ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḙḙ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḽḽ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḽḽ').isSuccess(), true);
                });
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṋṋ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṋṋ').isSuccess(), true);
                });
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṱṱ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṱṱ').isSuccess(), true);
                });
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṷṷ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṷṷ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') comma below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Șș'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Șș').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Țț'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Țț').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ää'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ää').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ëë'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ëë').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḧḧ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḧḧ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ïï'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ïï').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Öö'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Öö').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'ẗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ẗ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Üü'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Üü').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẅẅ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẅẅ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẍẍ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẍẍ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ÿÿ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ÿÿ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḯḯ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḯḯ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǘǘ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǘǘ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis and caron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǚǚ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǚǚ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis and grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǜǜ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǜǜ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis and macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǟǟ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǟǟ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȫȫ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȫȫ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǖǖ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǖǖ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') diaeresis below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṳṳ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṳṳ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') dot above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ȧȧ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȧȧ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḃḃ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḃḃ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ċċ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ċċ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḋḋ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḋḋ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ėė'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ėė').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḟḟ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḟḟ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ġġ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ġġ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḣḣ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḣḣ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'İi'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('İi').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṁṁ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṁṁ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṅṅ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṅṅ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȯȯ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȯȯ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṗṗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṗṗ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṙṙ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṙṙ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṡẛṡ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṡẛṡ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṫṫ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṫṫ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẇẇ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẇẇ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẋẋ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẋẋ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẏẏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẏẏ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Żż'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Żż').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') dot above and macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǡǡ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǡǡ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȱȱ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȱȱ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') dot below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ạạ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ạạ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḅḅ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḅḅ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḍḍ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḍḍ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẹẹ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẹẹ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḥḥ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḥḥ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ịị'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ịị').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḳḳ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḳḳ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḷḷ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḷḷ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṃṃ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṃṃ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṇṇ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṇṇ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ọọ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ọọ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṛṛ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṛṛ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṣṣ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṣṣ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṭṭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṭṭ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ụụ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ụụ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṿṿ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṿṿ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẉẉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẉẉ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỵỵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỵỵ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẓẓ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẓẓ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') dot below and dot above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṩṩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṩṩ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') dot below and macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḹḹ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḹḹ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṝṝ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṝṝ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') double acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Őő'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Őő').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Űű'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Űű').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') double grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ȁȁ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȁȁ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȅȅ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȅȅ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȉȉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȉȉ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȍȍ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȍȍ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȑȑ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȑȑ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȕȕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȕȕ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Àà'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Àà').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Èè'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Èè').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ìì'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ìì').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Àà'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Àà').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǹǹ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǹǹ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Òò'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Òò').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ùù'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ùù').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẁẁ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẁẁ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỳỳ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỳỳ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') hook above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ảả'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ảả').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẻẻ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẻẻ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỉỉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỉỉ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỏỏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỏỏ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ủủ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ủủ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỷỷ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỷỷ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ơơ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ơơ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ưư'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ưư').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ớớ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ơơ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ứứ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ứứ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn and dot below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ợợ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ợợ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ựự'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ựự').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn and grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ờờ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ờờ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ừừ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ừừ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn and hook above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ởở'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ởở').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ửử'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ửử').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') horn and tilde", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ỡỡ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỡỡ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ữữ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ữữ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') inverted breve", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ȃȃ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȃȃ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȇȇ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȇȇ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȋȋ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȋȋ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȏȏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȏȏ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȓȓ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȓȓ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȗȗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȗȗ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Āā'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Āā').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǣǣ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǣǣ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ēē'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ēē').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḡḡ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḡḡ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Īī'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Īī').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ōō'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ōō').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ūū'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ūū').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ȳȳ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȳȳ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') macron and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḗḗ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḗḗ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṓṓ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṓṓ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') macron and diaeresis", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṻṻ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṻṻ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') macron and grave", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḕḕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḕḕ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṑṑ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṑṑ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') macron below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḇḇ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḇḇ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḏḏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḏḏ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'ẖ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ẖ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḵḵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḵḵ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḻḻ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḻḻ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṉṉ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṉṉ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṟṟ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṟṟ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṯṯ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṯṯ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẕẕ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẕẕ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') ogonek", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ąą'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ąą').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ęę'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ęę').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Įį'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Įį').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ǫǫ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǫǫ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ųų'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ųų').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') ogonek and macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǭǭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǭǭ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') ring above", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Åå'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Åå').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ůů'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ůů').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'ẘ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ẘ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'ẙ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('ẙ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') ring above and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ǻǻ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ǻǻ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') ring below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḁḁ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḁḁ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') tilde", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ãã'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ãã').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ẽẽ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ẽẽ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ĩĩ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ĩĩ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ññ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ññ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Õõ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Õõ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ũũ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ũũ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṽṽ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṽṽ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ỹỹ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ỹỹ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') tilde and acute", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṍṍ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṍṍ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṹṹ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṹṹ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') tilde and diaeresis", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ṏṏ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṏṏ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') tilde and macron", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ȭȭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ȭȭ').isSuccess(), true);
                });
            });

            describe("#isAlpha('precomposed-latin') tilde below", () => {
                it("should return true when param is 'precomposed-latin' and tested value is 'Ḛḛ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḛḛ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ḭḭ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ḭḭ').isSuccess(), true);
                });

                it("should return true when param is 'precomposed-latin' and tested value is 'Ṵṵ'", () => {
                    assert.equal(new StringGuard().isAlpha('precomposed-latin').guard('Ṵṵ').isSuccess(), true);
                });
            });
        });

        describe("#isAlpha('deu')", () => {
            it("should return true when param is 'deu' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('deu').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'deu' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('deu').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'deu' and tested value is 'ÄäÖöÜüẞß'", () => {
                assert.equal(new StringGuard().isAlpha('deu').guard('ÄäÖöÜüẞß').isSuccess(), true);
            });

            it("should return false when param is 'deu' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('deu').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('fra')", () => {
            it("should return true when param is 'fra' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('fra').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'fra' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('fra').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'fra' and tested value is 'àâæçéèêëîïôœùûüÿ'", () => {
                assert.equal(new StringGuard().isAlpha('fra').guard('àâæçéèêëîïôœùûüÿ').isSuccess(), true);
            });

            it("should return true when param is 'fra' and tested value is 'ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ'", () => {
                assert.equal(new StringGuard().isAlpha('fra').guard('ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ').isSuccess(), true);
            });

            it("should return false when param is 'fra' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('fra').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('isl')", () => {
            it("should return true when param is 'isl' and tested value is 'aábdðeéfghiíjklmnoóprstuúvxyýþæö'", () => {
                assert.equal(
                    new StringGuard().isAlpha('isl').guard('aábdðeéfghiíjklmnoóprstuúvxyýþæö').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'isl' and tested value is 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ'", () => {
                assert.equal(
                    new StringGuard().isAlpha('isl').guard('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ').isSuccess(),
                    true
                );
            });

            it("should return false when param is 'isl' and tested value is 'cqw'", () => {
                assert.equal(new StringGuard().isAlpha('isl').guard('cqw').isSuccess(), false);
            });

            it("should return false when param is 'isl' and tested value is 'CQW'", () => {
                assert.equal(new StringGuard().isAlpha('isl').guard('CQW').isSuccess(), false);
            });

            it("should return false when param is 'isl' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('isl').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('ita')", () => {
            it("should return true when param is 'ita' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('ita').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'ita' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('ita').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'ita' and tested value is 'àéèíìîóòúù'", () => {
                assert.equal(new StringGuard().isAlpha('ita').guard('àéèíìîóòúù').isSuccess(), true);
            });

            it("should return true when param is 'ita' and tested value is 'ÀÉÈÍÌÎÓÒÚÙ'", () => {
                assert.equal(new StringGuard().isAlpha('ita').guard('ÀÉÈÍÌÎÓÒÚÙ').isSuccess(), true);
            });

            it("should return false when param is 'ita' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('ita').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('nor')", () => {
            it("should return true when param is 'nor' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('nor').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'nor' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('nor').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'nor' and tested value is 'ÆæØøÅåÉéÈèÊêÓóÒòÂâÔôŪūĀāĒē'", () => {
                assert.equal(new StringGuard().isAlpha('nor').guard('ÆæØøÅåÉéÈèÊêÓóÒòÂâÔôŪūĀāĒē').isSuccess(), true);
            });

            it("should return false when param is 'nor' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('nor').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('por')", () => {
            it("should return true when param is 'por' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('por').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'por' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('por').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'por' and tested value is 'ÁáÀàÂâÃãÉéÊêÈèÍíÌìÓóÔôÕõÒòÚúÙù'", () => {
                assert.equal(
                    new StringGuard().isAlpha('por').guard('ÁáÀàÂâÃãÉéÊêÈèÍíÌìÓóÔôÕõÒòÚúÙù').isSuccess(),
                    true
                );
            });

            it("should return false when param is 'por' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('por').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
        });

        describe("#isAlpha('spa')", () => {
            it("should return true when param is 'spa' and tested value is 'abcdefghijklmnopqrstwxyz'", () => {
                assert.equal(new StringGuard().isAlpha('spa').guard('abcdefghijklmnopqrstwxyz').isSuccess(), true);
            });

            it("should return true when param is 'spa' and tested value is 'ABCDEFGHIJKLMNOPQRSTWXYZ'", () => {
                assert.equal(new StringGuard().isAlpha('spa').guard('ABCDEFGHIJKLMNOPQRSTWXYZ').isSuccess(), true);
            });

            it("should return true when param is 'spa' and tested value is 'Ññ'", () => {
                assert.equal(new StringGuard().isAlpha('spa').guard('Ññ').isSuccess(), true);
            });

            it("should return false when param is 'spa' and tested value is '0123456789+-*/,?;.:/!§&~\"#'{([-|`_^@)]=}¨$£%µ<>'", () => {
                const str = '0123456789+-*/,?;.:/!§&~"#\'{([-|`_^@)]=}¨$£%µ<>';

                for (let pos = 0; pos < str.length; pos++) {
                    assert.equal(new StringGuard().isAlpha('spa').guard(str.charAt(pos)).isSuccess(), false);
                }
            });
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

    describe('#isAscii()', () => {
        const allAsciiChars =
            ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

        it("should return true when tested value is 'A'", () => {
            assert.equal(new StringGuard().isAscii().guard('A').isSuccess(), true);
        });

        it("should return true when tested value is ' '", () => {
            assert.equal(new StringGuard().isAscii().guard(' ').isSuccess(), true);
        });

        it(`should return true when tested value is '${allAsciiChars}'`, () => {
            assert.equal(new StringGuard().isAscii().guard(allAsciiChars).isSuccess(), true);
        });

        it("should return false when tested value is '€'", () => {
            assert.equal(new StringGuard().isAscii().guard('€').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isAscii().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isAscii().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isAscii().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isBase64()', () => {
        describe("#isBase64('standard')", () => {
            it("should return true when tested value is 'SGkh' (decoded: 'Hi!')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGkh').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk=' (decoded: 'Hi')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk=').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk+' (decoded: 'Hi>')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk+').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk/' (decoded: 'Hi?')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk/').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk=' (decoded: 'H')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk=').isSuccess(), true);
            });

            it("should return true when tested value is 'YG==' (decoded: 'a')", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('YG==').isSuccess(), true);
            });

            it("should return true when tested value is 'V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==' (decoded: 'What happens when you base64()?)'", () => {
                assert.equal(
                    new StringGuard()
                        .isBase64('standard')
                        .guard('V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==')
                        .isSuccess(),
                    true
                );
            });

            it("should return false when tested value is 'SGk'", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk-'", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk-').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk_'", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGk_').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh'", () => {
                assert.equal(new StringGuard().isBase64('standard').guard(' SGkh').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh '", () => {
                assert.equal(new StringGuard().isBase64('standard').guard(' SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is 'SGkh '", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is ' '", () => {
                assert.equal(new StringGuard().isBase64('standard').guard(' ').isSuccess(), false);
            });

            it("should return false when tested value is ''", () => {
                assert.equal(new StringGuard().isBase64('standard').guard('').isSuccess(), false);
            });

            it('should return false when tested value is null', () => {
                assert.equal(new StringGuard().isBase64('standard').guard(null).isSuccess(), false);
            });

            it('should return false when tested value is undefined', () => {
                assert.equal(new StringGuard().isBase64('standard').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isBase64('fileName')", () => {
            it("should return true when tested value is 'SGkh' (decoded: 'Hi!')", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGkh').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk=' (decoded: 'Hi')", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk=').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk+' (decoded: 'Hi>')", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk+').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk-'", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk-').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk=' (decoded: 'H')", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk=').isSuccess(), true);
            });

            it("should return true when tested value is 'YG==' (decoded: 'a')", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('YG==').isSuccess(), true);
            });

            it("should return true when tested value is 'V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==' (decoded: 'What happens when you base64()?)'", () => {
                assert.equal(
                    new StringGuard()
                        .isBase64('fileName')
                        .guard('V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==')
                        .isSuccess(),
                    true
                );
            });

            it("should return false when tested value is 'SGk'", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk/'", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk/').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk_'", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGk_').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh'", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard(' SGkh').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh '", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard(' SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is 'SGkh '", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is ' '", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard(' ').isSuccess(), false);
            });

            it("should return false when tested value is ''", () => {
                assert.equal(new StringGuard().isBase64('fileName').guard('').isSuccess(), false);
            });

            it('should return false when tested value is null', () => {
                assert.equal(new StringGuard().isBase64('fileName').guard(null).isSuccess(), false);
            });

            it('should return false when tested value is undefined', () => {
                assert.equal(new StringGuard().isBase64('fileName').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isBase64('urlSafe')", () => {
            it("should return true when tested value is 'aHR0cHM6Ly93d3cuZ29vZ2xlLmZy' (decoded: 'http://www.google.fr')", () => {
                assert.equal(
                    new StringGuard().isBase64('urlSafe').guard('aHR0cHM6Ly93d3cuZ29vZ2xlLmZy').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'aHR0cHM6Ly93d3cuYmFzZTY0ZW5jb2RlLm9yZy8' (decoded: 'https://www.base64encode.org/')", () => {
                assert.equal(
                    new StringGuard().isBase64('urlSafe').guard('aHR0cHM6Ly93d3cuYmFzZTY0ZW5jb2RlLm9yZy8').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'aHR0cHM6Ly9wYTEubmFydmlpLmNvbS82MzY4L2NkMGQyZmIyNmJhYzRmZmViNjRkNTQwNWQ4NjM2Zjg3MGZmYmJkOGZfaHEuZ2lm' (decoded: 'https://pa1.narvii.com/6368/cd0d2fb26bac4ffeb64d5405d8636f870ffbbd8f_hq.gif')", () => {
                assert.equal(
                    new StringGuard()
                        .isBase64('urlSafe')
                        .guard(
                            'aHR0cHM6Ly9wYTEubmFydmlpLmNvbS82MzY4L2NkMGQyZmIyNmJhYzRmZmViNjRkNTQwNWQ4NjM2Zjg3MGZmYmJkOGZfaHEuZ2lm'
                        )
                        .isSuccess(),
                    true
                );
            });

            it("should return true when tested value is 'SGkh' (decoded: 'Hi!')", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGkh').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk-'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGk-').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk_'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGK_').isSuccess(), true);
            });

            it("should return true when tested value is 'SGk'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGk').isSuccess(), true);
            });

            it("should return false when tested value is 'SGk='", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGk=').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk+'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGk+').isSuccess(), false);
            });

            it("should return false when tested value is 'SGk='", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGk=').isSuccess(), false);
            });

            it("should return false when tested value is 'YG=='", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('YG==').isSuccess(), false);
            });

            it("should return false when tested value is 'V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw=='", () => {
                assert.equal(
                    new StringGuard()
                        .isBase64('urlSafe')
                        .guard('V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==')
                        .isSuccess(),
                    false
                );
            });

            it("should return false when tested value is 'SGk/'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGK/').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh'", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard(' SGkh').isSuccess(), false);
            });

            it("should return false when tested value is ' SGkh '", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard(' SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is 'SGkh '", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('SGkh ').isSuccess(), false);
            });

            it("should return false when tested value is ' '", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard(' ').isSuccess(), false);
            });

            it("should return false when tested value is ''", () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard('').isSuccess(), false);
            });

            it('should return false when tested value is null', () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard(null).isSuccess(), false);
            });

            it('should return false when tested value is undefined', () => {
                assert.equal(new StringGuard().isBase64('urlSafe').guard(undefined).isSuccess(), false);
            });
        });
    });

    describe('#isBinary()', () => {
        it("should return true when tested value is '0'", () => {
            assert.equal(new StringGuard().isBinary().guard('0').isSuccess(), true);
        });

        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isBinary().guard('1').isSuccess(), true);
        });

        it("should return true when tested value is '10'", () => {
            assert.equal(new StringGuard().isBinary().guard('10').isSuccess(), true);
        });

        it("should return true when tested value is '11'", () => {
            assert.equal(new StringGuard().isBinary().guard('11').isSuccess(), true);
        });

        it("should return true when tested value is '11111111'", () => {
            assert.equal(new StringGuard().isBinary().guard('11111111').isSuccess(), true);
        });

        it("should return true when tested value is '0b0'", () => {
            assert.equal(new StringGuard().isBinary().guard('0b0').isSuccess(), true);
        });

        it("should return true when tested value is '0B0'", () => {
            assert.equal(new StringGuard().isBinary().guard('0B0').isSuccess(), true);
        });

        it("should return false when tested value is '2'", () => {
            assert.equal(new StringGuard().isBinary().guard('2').isSuccess(), false);
        });

        it("should return false when tested value is '0o10'", () => {
            assert.equal(new StringGuard().isBinary().guard('0o10').isSuccess(), false);
        });

        it("should return false when tested value is ' 0'", () => {
            assert.equal(new StringGuard().isBinary().guard(' 0').isSuccess(), false);
        });

        it("should return false when tested value is '0 '", () => {
            assert.equal(new StringGuard().isBinary().guard('0 ').isSuccess(), false);
        });

        it("should return false when tested value is ' '", () => {
            assert.equal(new StringGuard().isBinary().guard('').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isBinary().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isBinary().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isBinary().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isCapitalized()', () => {
        describe("#isCapitalized('firstChar', true)", () => {
            it("should return true when params are 'firstChar' and true, and tested value is 'Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('Foo').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and true, and tested value is 'Foo bar'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('Foo bar').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and true, and tested value is 'F'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('F').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and true, and tested value is ''", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('').isSuccess(), true);
            });

            it("should return false when params are 'firstChar' and true, and tested value is ' '", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard(' ').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is ' Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard(' Foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is ' foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard(' foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is '1990 foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('1990 foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is '#foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('#foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is '#Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('#Foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is 'Foo Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('Foo Bar').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is 'fOo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard('fOo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is null", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard(null).isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and true, and tested value is undefined", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', true).guard(undefined).isSuccess(), false);
            });
        });

        describe("#isCapitalized('firstChar', false)", () => {
            it("should return true when params are 'firstChar' and false, and tested value is 'Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('Foo').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is 'Foo bar'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('Foo bar').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is 'F'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('F').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is ''", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is ' '", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard(' ').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is ' foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard(' foo').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is '1990 foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('1990 foo').isSuccess(), true);
            });

            it("should return true when params are 'firstChar' and false, and tested value is '#foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('#foo').isSuccess(), true);
            });

            it("should return false when params are 'firstChar' and false, and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and false, and tested value is '#Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('#Foo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and false, and tested value is 'Foo Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('Foo Bar').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and false, and tested value is 'fOo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard('fOo').isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and false, and tested value is null", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard(null).isSuccess(), false);
            });

            it("should return false when params are 'firstChar' and false, and tested value is undefined", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar', false).guard(undefined).isSuccess(), false);
            });
        });

        describe("#isCapitalized('firstChar')", () => {
            it("should return false when param is 'firstChar' and tested value is '1990 foo'", () => {
                assert.equal(new StringGuard().isCapitalized('firstChar').guard('1990 foo').isSuccess(), false);
            });
        });

        describe("#isCapitalized('startCase', true)", () => {
            it("should return true when params are 'startCase' and true, and tested value is 'The Quick Brown Fox Jumps Over The Lazy Dog.'", () => {
                assert.equal(
                    new StringGuard()
                        .isCapitalized('startCase', true)
                        .guard('The Quick Brown Fox Jumps Over The Lazy Dog.')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when params are 'startCase' and true, and tested value is 'Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('Foo').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and true, and tested value is 'Foo Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('Foo Bar').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and true, and tested value is 'F'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('F').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and true, and tested value is ''", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and true, and tested value is ' '", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(' ').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and true, and tested value is ' Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(' Bar').isSuccess(), true);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'The Quick Brown Fox Jumps Over The Lazy dog.'", () => {
                assert.equal(
                    new StringGuard()
                        .isCapitalized('startCase', true)
                        .guard('The Quick Brown Fox Jumps Over The Lazy dog.')
                        .isSuccess(),
                    false
                );
            });

            it("should return false when params are 'startCase' and true, and tested value is '1990 Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('1990 Foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is '#foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('#foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is ' #foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(' #foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'baR'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('baR').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is ' bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(' bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'Foo bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('Foo bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'f'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('f').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is '1990 foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('1990 foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is '#Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('#Foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is 'fOo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard('fOo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is null", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(null).isSuccess(), false);
            });

            it("should return false when params are 'startCase' and true, and tested value is undefined", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', true).guard(undefined).isSuccess(), false);
            });
        });

        describe("#isCapitalized('startCase', false)", () => {
            it("should return true when params are 'startCase' and false, and tested value is 'The Quick Brown Fox Jumps Over The Lazy Dog.'", () => {
                assert.equal(
                    new StringGuard()
                        .isCapitalized('startCase', false)
                        .guard('The Quick Brown Fox Jumps Over The Lazy Dog.')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when params are 'startCase' and false, and tested value is 'Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('Foo').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is 'Foo Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('Foo Bar').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is 'F'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('F').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is ''", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is ' '", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(' ').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is '1990 Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('1990 Foo').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is '#foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('#foo').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is ' Bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(' Bar').isSuccess(), true);
            });

            it("should return true when params are 'startCase' and false, and tested value is ' #foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(' #foo').isSuccess(), true);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'baR'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('baR').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is ' bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(' bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'Foo bar'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('Foo bar').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'f'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('f').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is '1990 foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('1990 foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is '#Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('#Foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('foo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is 'fOo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard('fOo').isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is null", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(null).isSuccess(), false);
            });

            it("should return false when params are 'startCase' and false, and tested value is undefined", () => {
                assert.equal(new StringGuard().isCapitalized('startCase', false).guard(undefined).isSuccess(), false);
            });
        });

        describe("#isCapitalized('startChar')", () => {
            it("should return true when param is 'startCase' and tested value is '1990 Foo'", () => {
                assert.equal(new StringGuard().isCapitalized('startCase').guard('1990 Foo').isSuccess(), false);
            });
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

        it("should return true when tested value is '0.1'", () => {
            assert.equal(new StringGuard().isDecimal().guard('0.1').isSuccess(), true);
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

        describe('#isDecimal({ force: true })', () => {
            it("should return true when param is { force: true } and tested value is '1.1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true }).guard('1.1').isSuccess(), true);
            });

            it("should return true when param is { force: true } and tested value is '-1.1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true }).guard('-1.1').isSuccess(), true);
            });

            it("should return true when param is { force: true } and tested value is '1.0'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true }).guard('1.0').isSuccess(), true);
            });

            it("should return true when param is { force: true } and tested value is '0.0'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true }).guard('0.0').isSuccess(), true);
            });

            it("should return false when param is { force: true } and tested value is '1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true }).guard('1').isSuccess(), false);
            });
        });

        describe('#isDecimal({ force: false })', () => {
            it("should return true when param is { force: false } and tested value is '1.1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: false }).guard('1.1').isSuccess(), true);
            });

            it("should return true when param is { force: false } and tested value is '1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: false }).guard('1').isSuccess(), true);
            });
        });

        describe('#isDecimal({ precision: <number> })', () => {
            it("should return true when param is { precision: 1 } and tested value is '1.1'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 1 }).guard('1.1').isSuccess(), true);
            });

            it("should return true when param is { precision: 3 } and tested value is '11.123'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 3 }).guard('11.123').isSuccess(), true);
            });

            it("should return true when param is { precision: 4 } and tested value is '-1000.1234'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 4 }).guard('-1000.1234').isSuccess(), true);
            });

            it("should return true when param is { precision: 0 } and tested value is '1'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 0 }).guard('1').isSuccess(), true);
            });

            it("should return false when param is { precision: 2 } and tested value is '1.123'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 2 }).guard('1.123').isSuccess(), false);
            });

            it("should return false when param is { precision: 2 } and tested value is '-1.123'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: 2 }).guard('-1.123').isSuccess(), false);
            });

            it("should return false when param is { precision: -1 } and tested value is '1'", () => {
                assert.equal(new StringGuard().isDecimal({ precision: -1 }).guard('1').isSuccess(), false);
            });
        });

        describe('#isDecimal({ force: true, precision: <number> })', () => {
            it("should return true when paramd are { force: true, precision: 1 } and tested value is '1.1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true, precision: 1 }).guard('1.1').isSuccess(), true);
            });

            it("should return false when paramd are { force: true, precision: 0 } and tested value is '1'", () => {
                assert.equal(new StringGuard().isDecimal({ force: true, precision: 0 }).guard('1').isSuccess(), false);
            });
        });
    });

    describe('#isEmailAddress()', () => {
        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isEmailAddress().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isEmailAddress().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isEmailAddress().guard(undefined).isSuccess(), false);
        });

        describe("#isEmailAddress('quick')", () => {
            it("should return true when param is 'quick' and tested value is 'simple@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('quick').guard('simple@example.com').isSuccess(), true);
            });

            it("should return true when param is 'quick' and tested value is 'very.common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quick' and tested value is 'very_common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very_common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quick' and tested value is 'very-common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very-common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quick' and tested value is 'very.common@example.info'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.info').isSuccess(),
                    true
                );
            });

            it("should return false when param is 'quick' and tested value is 'very.common@example.education'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('quick').guard('very.common@example.education').isSuccess(),
                    false
                );
            });
        });

        describe("#isEmailAddress('rfc5322')", () => {
            it("should return true when param is 'rfc5322' and tested value is 'simple@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('simple@example.com').isSuccess(), true);
            });

            it("should return true when param is 'rfc5322' and tested value is 'simPle@eXample.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('simPle@eXample.com').isSuccess(), true);
            });

            it("should return true when param is 'rfc5322' and tested value is 'very.common@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('very.common@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'disposable.style.email.with+symbol@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('disposable.style.email.with+symbol@example.com')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'other.email-with-hyphen@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('other.email-with-hyphen@example.com')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'fully-qualified-domain@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('fully-qualified-domain@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'user.name+tag+sorting@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('user.name+tag+sorting@example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'x@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('x@example.com').isSuccess(), true);
            });

            it("should return true when param is 'rfc5322' and tested value is 'example-indeed@strange-example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('example-indeed@strange-example.com').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'mailhost!username@example.org'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('mailhost!username@example.org').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'user%example.com@example.org'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('user%example.com@example.org').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'rfc5322' and tested value is 'user-@example.org'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('user-@example.org').isSuccess(), true);
            });

            // Syntax using double quotes and square brackets not allowed.
            it("should return false when param is 'rfc5322' and tested value is '\" \"@example.org'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('" "@example.org').isSuccess(), false);
            });

            // Syntax using double quotes and square brackets not allowed.
            it("should return false when param is 'rfc5322' and tested value is '\"john..doe\"@example.org'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('"john..doe"@example.org').isSuccess(),
                    false
                );
            });

            // No @ character.
            it("should return false when param is 'rfc5322' and tested value is 'Abc.example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('Abc.example.com').isSuccess(), false);
            });

            // Only one @ is allowed outside quotation marks.
            it("should return false when param is 'rfc5322' and tested value is 'A@b@c@example.com'", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('A@b@c@example.com').isSuccess(), false);
            });

            // None of the special characters in this local-part are allowed outside quotation marks.
            it("should return false when param is 'rfc5322' and tested value is 'a\"b(c)d,e:f;g<h>i[jk]l@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('a"b(c)d,e:f;g<h>i[jk]l@example.com').isSuccess(),
                    false
                );
            });

            // Quoted strings must be dot separated or the only element making up the local-part.
            it("should return false when param is 'rfc5322' and tested value is 'just\"not\"right@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('just"not"right@example.com').isSuccess(),
                    false
                );
            });

            // Spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash.
            it("should return false when param is 'rfc5322' and tested value is 'this is\"not\\allowed@example.com'", () => {
                assert.equal(
                    new StringGuard().isEmailAddress('rfc5322').guard('this is"not\\allowed@example.com').isSuccess(),
                    false
                );
            });

            // Even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes.
            it("should return false when param is 'rfc5322' and tested value is 'this\\ still\\\"not\\\\allowed@example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('this\\ still\\"not\\\\allowed@example.com')
                        .isSuccess(),
                    false
                );
            });

            // Underscore is not allowed in domain part.
            it("should return false when param is 'rfc5322' and tested value is 'i_like_underscore@but_its_not_allowed_in_this_part.example.com'", () => {
                assert.equal(
                    new StringGuard()
                        .isEmailAddress('rfc5322')
                        .guard('i_like_underscore@but_its_not_allowed_in_this_part.example.com')
                        .isSuccess(),
                    false
                );
            });

            it("should return false when param is 'rfc5322' and tested value is ''", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard('').isSuccess(), false);
            });

            it("should return false when param is 'rfc5322' and tested value is null", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'rfc5322' tested value is undefined", () => {
                assert.equal(new StringGuard().isEmailAddress('rfc5322').guard(undefined).isSuccess(), false);
            });
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

        it("should return true when tested value is '0x507F1'", () => {
            assert.equal(new StringGuard().isHex().guard('0x507F1').isSuccess(), true);
        });

        it("should return true when tested value is '0X507F1'", () => {
            assert.equal(new StringGuard().isHex().guard('0X507F1').isSuccess(), true);
        });

        it("should return true when tested value is '112345679065574883030833'", () => {
            assert.equal(new StringGuard().isHex().guard('112345679065574883030833').isSuccess(), true);
        });

        it("should return true when tested value is 'FFFFFFFFFFFFFFFFFFFFFFFF'", () => {
            assert.equal(new StringGuard().isHex().guard('FFFFFFFFFFFFFFFFFFFFFFFF').isSuccess(), true);
        });

        it("should return true when tested value is '0b0'", () => {
            assert.equal(new StringGuard().isHex().guard('0b0').isSuccess(), true);
        });

        it("should return false when tested value is '507f1f77bcf86cd79943901g'", () => {
            assert.equal(new StringGuard().isHex().guard('507f1f77bcf86cd79943901g').isSuccess(), false);
        });

        it("should return false when tested value is '507f1f77bcf86cd799439011 '", () => {
            assert.equal(new StringGuard().isHex().guard('507f1f77bcf86cd799439011 ').isSuccess(), false);
        });

        it("should return false when tested value is ' 507f1f77bcf86cd799439011'", () => {
            assert.equal(new StringGuard().isHex().guard(' 507f1f77bcf86cd799439011').isSuccess(), false);
        });

        it("should return false when tested value is ' '", () => {
            assert.equal(new StringGuard().isHex().guard(' ').isSuccess(), false);
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

        describe("#isHexColor('3')", () => {
            it("should return true when param is 3 and tested value is '#000'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('#000').isSuccess(), true);
            });

            it("should return true when param is 3 and tested value is '#FFF'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('#FFF').isSuccess(), true);
            });

            it("should return true when param is 3 and tested value is '#aa3'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('#aa3').isSuccess(), true);
            });

            it("should return false when param is 3 and tested value is '000'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('000').isSuccess(), false);
            });

            it("should return false when param is 3 and tested value is '#AA33'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('#AA33').isSuccess(), false);
            });

            it("should return false when param is 3 and tested value is '#000000'", () => {
                assert.equal(new StringGuard().isHexColor('3').guard('000000').isSuccess(), false);
            });
        });

        describe('#isHexColor(6)', () => {
            it("should return true when param is 6 and tested value is '#000000'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#000000').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#FFFFFF'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#FFFFFF').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#AA33FF'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#AA33FF').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '#aa33ff'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#aa33ff').isSuccess(), true);
            });

            it("should return false when param is 6 and tested value is '000000'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('000000').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA33FFA'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#AA33FFA').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA3'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('#AA3').isSuccess(), false);
            });

            it("should return false when param is 6 and tested value is '#AA33FG'", () => {
                assert.equal(new StringGuard().isHexColor('6').guard('AA33FG').isSuccess(), false);
            });
        });
    });

    describe('#isIn()', () => {
        it("should return true when param is ['foo', 'bar'] and tested value is 'foo'", () => {
            assert.equal(new StringGuard().isIn(['foo', 'bar']).guard('foo').isSuccess(), true);
        });

        it("should return false when param is ['bar'] and tested value is 'foo'", () => {
            assert.equal(new StringGuard().isIn(['bar']).guard('foo').isSuccess(), false);
        });

        it("should return false when param is [] and tested value is 'foo'", () => {
            assert.equal(new StringGuard().isIn([]).guard('foo').isSuccess(), false);
        });

        it("should return false when param ['foo'] and tested value is null", () => {
            assert.equal(new StringGuard().isIn(['foo']).guard(null).isSuccess(), false);
        });

        it("should return false when param ['foo'] and tested value is undefined", () => {
            assert.equal(new StringGuard().isIn(['foo']).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isIpAddress()', () => {
        it("should return true when tested value is '10.0.0.0'", () => {
            assert.equal(new StringGuard().isIpAddress().guard('10.0.0.0').isSuccess(), true);
        });

        it("should return true when tested value is '1:2:3:4:5:6:7:8'", () => {
            assert.equal(new StringGuard().isIpAddress().guard('1:2:3:4:5:6:7:8').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIpAddress().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIpAddress().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIpAddress().guard(undefined).isSuccess(), false);
        });

        describe("#isIpAddress('4')", () => {
            it("should return true when param is 4 and tested value is '0.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('0.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '10.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('10.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '127.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('127.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '192.168.0.1'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('192.168.0.1').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '224.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('224.0.0.0').isSuccess(), true);
            });

            it("should return true when param is 4 and tested value is '255.255.255.255'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('255.255.255.255').isSuccess(), true);
            });

            it("should return false when param is 4 and tested value is '010.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('010.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is '001.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('001.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is 'x127.0.0.0'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('x127.0.0.0').isSuccess(), false);
            });

            it("should return false when param is 4 and tested value is '127.0.0.0x'", () => {
                assert.equal(new StringGuard().isIpAddress('4').guard('127.0.0.0x').isSuccess(), false);
            });
        });

        describe("#isIpAddress('6')", () => {
            it("should return true when param is 6 and tested value is '1:2:3:4:5:6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1:2:3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::5:6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::4:5:6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '1::3:4:5:6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('1::3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '::2:3:4:5:6:7:8'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('::2:3:4:5:6:7:8').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is 'fe80::7:8%eth0'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('fe80::7:8%eth0').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '::255.255.255.255'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('::255.255.255.255').isSuccess(), true);
            });

            it("should return true when param is 6 and tested value is '2001:db8:3:4::192.0.2.33'", () => {
                assert.equal(new StringGuard().isIpAddress('6').guard('2001:db8:3:4::192.0.2.33').isSuccess(), true);
            });
        });
    });

    describe('#isIso3166Part1Alpha()', () => {
        it("should return true when tested value is 'FR'", () => {
            assert.equal(new StringGuard().isIso3166Part1Alpha().guard('FR').isSuccess(), true);
        });

        it("should return true when tested value is 'FRA'", () => {
            assert.equal(new StringGuard().isIso3166Part1Alpha().guard('FRA').isSuccess(), true);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIso3166Part1Alpha().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIso3166Part1Alpha().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIso3166Part1Alpha().guard(undefined).isSuccess(), false);
        });

        describe("#isIso3166Part1Alpha('2')", () => {
            it("should return true when param is 2 and tested value is 'FR'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('2').guard('FR').isSuccess(), true);
            });

            it("should return true when param is 2 and tested value is 'DE'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('2').guard('DE').isSuccess(), true);
            });

            it("should return false when param is 2 and tested value is 'FRA'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('2').guard('FRA').isSuccess(), false);
            });

            it("should return false when param is 2 and tested value is 'fr", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('2').guard('fr').isSuccess(), false);
            });
        });

        describe("#isIso3166Part1Alpha('3')", () => {
            it("should return true when param is 3 and tested value is 'FRA'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('3').guard('FRA').isSuccess(), true);
            });

            it("should return true when param is 3 and tested value is 'DEU'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('3').guard('DEU').isSuccess(), true);
            });

            it("should return false when param is 3 and tested value is 'FR'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('3').guard('FR').isSuccess(), false);
            });

            it("should return false when param is 3 and tested value is 'fra'", () => {
                assert.equal(new StringGuard().isIso3166Part1Alpha('3').guard('fra').isSuccess(), false);
            });
        });
    });

    describe('#isIso4217Alpha3()', () => {
        it("should return true when tested value is 'EUR'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('EUR').isSuccess(), true);
        });

        it("should return true when tested value is 'USD'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('USD').isSuccess(), true);
        });

        it("should return true when tested value is 'CHF'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('CHF').isSuccess(), true);
        });

        it("should return true when tested value is 'XAU'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('XAU').isSuccess(), true);
        });

        it("should return false when tested value is 'eur'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('eur').isSuccess(), false);
        });

        it("should return false when tested value is 'FRF'", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('FRF').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIso4217Alpha3().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isIso639Part1Alpha2()', () => {
        it("should return true when tested value is 'en'", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('en').isSuccess(), true);
        });

        it("should return true when tested value is 'es'", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('es').isSuccess(), true);
        });

        it("should return true when tested value is 'fr'", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('fr').isSuccess(), true);
        });

        it("should return false when tested value is 'EN'", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('EN').isSuccess(), false);
        });

        it("should return false when tested value is 'eng'", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('eng').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIso639Part1Alpha2().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isIso639Part2Alpha3()', () => {
        it("should return true when tested value is 'eng'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('eng').isSuccess(), true);
        });

        it("should return true when tested value is 'spa'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('spa').isSuccess(), true);
        });

        it("should return true when tested value is 'fre'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('fre').isSuccess(), true);
        });

        it("should return false when tested value is 'sqi'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('sqi').isSuccess(), false);
        });

        it("should return false when tested value is 'EN'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('EN').isSuccess(), false);
        });

        it("should return false when tested value is 'en'", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('en').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isIso639Part2Alpha3().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isJson()', () => {
        it('should return true when tested value is \'{ "name":"John", "age":30, "car":null }\'', () => {
            assert.equal(new StringGuard().isJson().guard('{ "name":"John", "age":30, "car":null }').isSuccess(), true);
        });

        it("should return true when tested value is '{}'", () => {
            assert.equal(new StringGuard().isJson().guard('{}').isSuccess(), true);
        });

        it("should return true when tested value is 'true'", () => {
            assert.equal(new StringGuard().isJson().guard('true').isSuccess(), true);
        });

        it('should return true when tested value is \'"foo"\'"', () => {
            assert.equal(new StringGuard().isJson().guard('"foo"').isSuccess(), true);
        });

        it('should return true when tested value is \'["foo"]\'', () => {
            assert.equal(new StringGuard().isJson().guard('["foo"]').isSuccess(), true);
        });

        it("should return true when tested value is 'null'", () => {
            assert.equal(new StringGuard().isJson().guard('null').isSuccess(), true);
        });

        it('should return false when tested value is \'{ "name":\'John\', "age":30, "car":null }\'', () => {
            assert.equal(
                new StringGuard().isJson().guard('{ "name":\'John\', "age":30, "car":null }').isSuccess(),
                false
            );
        });

        it("should return false when tested value is ['foo']", () => {
            assert.equal(new StringGuard().isJson().guard(['foo']).isSuccess(), false);
        });

        it('should return false when tested value is true', () => {
            assert.equal(new StringGuard().isJson().guard(true).isSuccess(), false);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new StringGuard().isJson().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is "foo"', () => {
            assert.equal(new StringGuard().isJson().guard('foo').isSuccess(), false);
        });

        it("should return false when tested value is ' '", () => {
            assert.equal(new StringGuard().isJson().guard(' ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isJson().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isJson().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isJson().guard(undefined).isSuccess(), false);
        });

        describe("#isJson('array)", () => {
            it('should return true when tested value is \'["foo"]\'', () => {
                assert.equal(new StringGuard().isJson('array').guard('["foo"]').isSuccess(), true);
            });

            it("should return true when tested value is '[]'", () => {
                assert.equal(new StringGuard().isJson('array').guard('[]').isSuccess(), true);
            });

            it('should return false when tested value is \'{ "name":"John", "age":30, "car":null }\'', () => {
                assert.equal(
                    new StringGuard().isJson('array').guard('{ "name":"John", "age":30, "car":null }').isSuccess(),
                    false
                );
            });

            it('should return false when tested value is \'"foo"\'"', () => {
                assert.equal(new StringGuard().isJson('array').guard('"foo"').isSuccess(), false);
            });
        });

        describe("#isJson('object)", () => {
            it('should return true when tested value is \'{ "name":"John", "age":30, "car":null }\'', () => {
                assert.equal(
                    new StringGuard().isJson('object').guard('{ "name":"John", "age":30, "car":null }').isSuccess(),
                    true
                );
            });

            it("should return true when tested value is '{}'", () => {
                assert.equal(new StringGuard().isJson('object').guard('{}').isSuccess(), true);
            });

            it('should return false when tested value is \'["foo"]\'', () => {
                assert.equal(new StringGuard().isJson('object').guard('["foo"]').isSuccess(), false);
            });

            it('should return false when tested value is \'"foo"\'"', () => {
                assert.equal(new StringGuard().isJson('object').guard('"foo"').isSuccess(), false);
            });
        });

        describe("#isJson('string)", () => {
            it('should return true when tested value is \'"foo"\'"', () => {
                assert.equal(new StringGuard().isJson('string').guard('"foo"').isSuccess(), true);
            });

            it('should return false when tested value is \'["foo"]\'', () => {
                assert.equal(new StringGuard().isJson('string').guard('["foo"]').isSuccess(), false);
            });

            it('should return false when tested value is \'{ "name":"John", "age":30, "car":null }\'', () => {
                assert.equal(
                    new StringGuard().isJson('string').guard('{ "name":"John", "age":30, "car":null }').isSuccess(),
                    false
                );
            });
        });
    });

    describe('#isLatLong()', () => {
        it("should return true when tested value is '49° 30′ 00″ N, 144° 57′ 48″ E'", () => {
            assert.equal(new StringGuard().isLatLong().guard('49° 30′ 00″ N, 144° 57′ 48″ E').isSuccess(), true);
        });

        it("should return true when tested value is '49° 30.0000′ N, 144° 57.8022′ E'", () => {
            assert.equal(new StringGuard().isLatLong().guard('49° 30.0000′ N, 144° 57.8022′ E').isSuccess(), true);
        });

        it("should return true when tested value is '49.508418°, 144.963375°'", () => {
            assert.equal(new StringGuard().isLatLong().guard('49.508418°, 144.963375°').isSuccess(), true);
        });

        it("should return true when tested value is '49.508418°,144.963375°'", () => {
            assert.equal(new StringGuard().isLatLong().guard('49.508418°,144.963375°').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isLatLong().guard(null).isSuccess(), false);
        });

        it("should return true when tested value is '49° 30′ 00″ N, 144° 57′ 48″ E'", () => {
            assert.equal(new StringGuard().isLatLong().guard('49° 30′ 00″ N, 144° 57′ 48″ E').isSuccess(), true);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isLatLong().guard(undefined).isSuccess(), false);
        });

        describe("#isLatLong('DMS')", () => {
            it("should return true when tested value is '49° 30′ 00″ N, 144° 57′ 48″ E'", () => {
                assert.equal(
                    new StringGuard().isLatLong('DMS').guard('49° 30′ 00″ N, 144° 57′ 48″ E').isSuccess(),
                    true
                );
            });
        });

        describe("#isLatLong('DM')", () => {
            it("should return true when tested value is '49° 30.0000′ N, 144° 57.8022′ E'", () => {
                assert.equal(
                    new StringGuard().isLatLong('DM').guard('49° 30.0000′ N, 144° 57.8022′ E').isSuccess(),
                    true
                );
            });
        });

        describe("#isLatLong('DD')", () => {
            it("should return true when tested value is '49.508418°, 144.963375°'", () => {
                assert.equal(new StringGuard().isLatLong('DD').guard('49.508418°, 144.963375°').isSuccess(), true);
            });
        });
    });

    describe('#isLatitude()', () => {
        it("should return true when tested value is '49° 30′ 00″ N'", () => {
            assert.equal(new StringGuard().isLatitude().guard('49° 30′ 00″ N').isSuccess(), true);
        });

        it("should return true when tested value is '49° 30.0000′ N'", () => {
            assert.equal(new StringGuard().isLatitude().guard('49° 30.0000′ N').isSuccess(), true);
        });

        it("should return true when tested value is '49.508418°'", () => {
            assert.equal(new StringGuard().isLatitude().guard('49.508418°').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isLatitude().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isLatitude().guard(undefined).isSuccess(), false);
        });

        describe("#isLatitude('DMS')", () => {
            it("should return true when param is 'DMS' and tested value is '49° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 30′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 30′ 30″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 30″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 59′ 59″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 59′ 59″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '90° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '90° 00′ 00″ S'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 00′ 00″ S').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '00° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('00° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '00° 00′ 00″ S'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('00° 00′ 00″ S').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '0° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('0° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '1° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('1° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '9° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('9° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '09° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('09° 00′ 00″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 30′ 30.1″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 30.1″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 30′ 30.9999″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 30.9999″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '49° 30′ 30.0000″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 30.0000″ N').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '90° 00′ 00.0000″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 00′ 00.0000″ N').isSuccess(), true);
            });

            it("should return false when param is 'DMS' and tested value is '49° 60′ 59″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 60′ 59″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '49° 59′ 60″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 59′ 60″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '090° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('090° 00′ 00″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '000° 00′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('000° 00′ 00″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '-90° 00′ 00″ S'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('-90° 00′ 00″ S').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '-00° 00′ 00″ S'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('-00° 00′ 00″ S').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '00° 00' 00'' S'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard("00° 00' 00'' S").isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '49° 30′ 30.99999″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49° 30′ 30.99999″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '90° 01′ 00″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 01′ 00″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '90° 00′ 01″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 00′ 01″ N').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '90° 00′ 00.0001″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('90° 00′ 00.0001″ N').isSuccess(), false);
            });
        });

        describe("#isLatitude('DM')", () => {
            it("should return true when param is 'DM' and tested value is '49° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '49° 30.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 30.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '49° 30.3000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 30.3000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '49° 59.3000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 59.3000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '90° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '90° 00.0000′ S'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 00.0000′ S').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '00° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('00° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '00° 00.0000′ S'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('00° 00.0000′ S').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '0° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('0° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '1° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('1° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '9° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('9° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '09° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('09° 00.0000′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '49° 30′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 30′ N').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '90° 00.0000′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 00.0000′ N').isSuccess(), true);
            });

            it("should return false when param is 'DM' and tested value is '49° 60′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 60′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '49° 59′ 60″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 59′ 60″ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '49.508418°'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49.508418°').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '090° 00′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('090° 00′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '000° 00′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('000° 00′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '-90° 00′ S'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('-90° 00′ S').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '-00° 00′ S'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('-00° 00′ S').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '00° 00' S'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard("00° 00' S").isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '49° 30.99999′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('49° 30.99999′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '90° 01′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 01′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '90° 00.1′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 00.1′ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '90° 00.0001′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DM').guard('90° 00.0001′ N').isSuccess(), false);
            });
        });

        describe("#isLatitude('DD')", () => {
            it("should return true when param is 'DD' and tested value is '49.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.000000°').isSuccess(), true);
            });

            it("should return true when tested value is '49.508418°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.508418°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.1°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.1°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.22°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.22°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.333°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.333°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.4444°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.4444°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.55555°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.55555°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49.666666°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49.666666°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '90.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('90.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '-90.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('-90.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '00.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('00.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '0.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('0.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '1.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('1.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '9.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('9.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '09.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('09.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '-00.000000°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('-00.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '1°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('1°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '49°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49°').isSuccess(), true);
            });

            it("should return false when param is 'DD' and tested value is '49° 30′ 30″ N'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49° 30′ 30″ N').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '49° 30.5051′ N'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('49° 30.5051′ N').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '49.7777777°'", () => {
                assert.equal(new StringGuard().isLatitude('DMS').guard('49.7777777°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '090°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('090°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '91°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('91°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '90.1°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('90.1°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '90.000001°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('90.000001°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-91°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('-91°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-90.1°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('-90.1°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-90.000001°'", () => {
                assert.equal(new StringGuard().isLatitude('DD').guard('-90.000001°').isSuccess(), false);
            });
        });
    });

    describe('#isLongitude()', () => {
        it("should return true when tested value is '144° 57′ 48″ E'", () => {
            assert.equal(new StringGuard().isLongitude().guard('144° 57′ 48″ E').isSuccess(), true);
        });

        it("should return true when tested value is '144° 57.8022′ E'", () => {
            assert.equal(new StringGuard().isLongitude().guard('144° 57.8022′ E').isSuccess(), true);
        });

        it("should return true when tested value is '144.963375°'", () => {
            assert.equal(new StringGuard().isLongitude().guard('144.963375°').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isLongitude().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isLongitude().guard(undefined).isSuccess(), false);
        });

        describe("#isLongitude('DMS')", () => {
            it("should return true when param is 'DMS' and tested value is '144° 00′ 00″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 00′ 00″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '144° 57′ 00″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 00″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '144° 57′ 48″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 48″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '179° 59′ 59″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('179° 59′ 59″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '180° 00′ 00″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 00′ 00″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '180° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '000° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('000° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '000° 00′ 00″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('000° 00′ 00″ E').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '00° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('00° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '0° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('0° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '1° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('1° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '9° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('9° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '09° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('09° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '009° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('009° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '19° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('19° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '019° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('019° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '99° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('99° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '099° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('099° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '100° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('100° 00′ 00″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '144° 57′ 48.1″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 48.1″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '144° 57′ 48.1321″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 48.1321″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '144° 57′ 48.0000″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 48.0000″ W').isSuccess(), true);
            });

            it("should return true when param is 'DMS' and tested value is '180° 00′ 00.0000″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 00′ 00.0000″ E').isSuccess(), true);
            });

            it("should return false when param is 'DMS' and tested value is '144° 60′ 59″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 60′ 59″ E').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '144° 59′ 60″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 59′ 60″ E').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '-180° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('-180° 00′ 00″ W').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '-0° 00′ 00″ W'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('-0° 00′ 00″ W').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '0° 00' 00'' E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard("0° 00' 00'' E").isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '144° 57′ 48.55555 E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144° 57′ 48.55555 E').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '180° 01′ 00″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 01′ 00″ E').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '180° 00′ 01″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 00′ 01″ E').isSuccess(), false);
            });

            it("should return false when param is 'DMS' and tested value is '180° 00′ 00.0001″ E'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('180° 00′ 00.0001″ E').isSuccess(), false);
            });
        });

        describe("#isLongitude('DM')", () => {
            it("should return true when param is 'DM' and tested value is '144° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '144° 57.8022′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 57.8022′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '144° 59.3000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 59.3000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '179° 59.9999′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('179° 59.9999′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '190° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('180° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '180° 00.0000′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('180° 00.0000′ W').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '000° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('000° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '000° 00.0000′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('000° 00.0000′ W').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '00° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('00° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '0° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('0° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '1° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('1° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '9° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('9° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '09° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('09° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '009° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('009° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '19° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('19° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '99° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('99° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '099° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('099° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '100° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('100° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '019° 00.0000′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('019° 00.0000′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '49° 30′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('49° 30′ E').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '90° 00′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('90° 00′ W').isSuccess(), true);
            });

            it("should return true when param is 'DM' and tested value is '144° 59′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 59′ W').isSuccess(), true);
            });

            it("should return false when param is 'DM' and tested value is '144° 6′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 6′ W').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '144° 60′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 60′ E').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '144.508418°'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144.508418°').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '-180° 00′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('-180° 00′ E').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '-00° 00′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('-00° 00′ W').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '00° 00' W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard("00° 00' W").isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '144° 57.55555′ W'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('144° 57.55555 W').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '180° 01′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('180° 01′ E').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '180° 00.1′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('180° 00.1′ E').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '180° 00.0001′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DM').guard('180° 00.0001′ E').isSuccess(), false);
            });
        });

        describe("#isLongitude('DD')", () => {
            it("should return true when param is 'DD' and tested value is '144.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.000000°').isSuccess(), true);
            });

            it("should return true when tested value is '144.963375°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.963375°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.1°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.1°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.22°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.22°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.333°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.333°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.4444°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.4444°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.55555°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.55555°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144.666666°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144.666666°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '180.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('180.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '-180.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('-180.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '000.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('000.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '00.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('00.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '0.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('0.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '-0.000000°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('-0.000000°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '144°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '44°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('44°').isSuccess(), true);
            });

            it("should return true when param is 'DD' and tested value is '4°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('4°').isSuccess(), true);
            });

            it("should return false when param is 'DD' and tested value is '144° 57′ 30″ N'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144° 57′ 30″ N').isSuccess(), false);
            });

            it("should return false when param is 'DM' and tested value is '144° 57.8022′ E'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('144° 57.8022′ E').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '144.7777777°'", () => {
                assert.equal(new StringGuard().isLongitude('DMS').guard('144.7777777°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '181°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('181°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '180.1°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('180.1°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '180.000001°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('180.000001°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-181°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('-181°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-180.1°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('-180.1°').isSuccess(), false);
            });

            it("should return false when param is 'DD' and tested value is '-180.000001°'", () => {
                assert.equal(new StringGuard().isLongitude('DD').guard('-180.000001°').isSuccess(), false);
            });
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

        it("should return true when tested value is 'foö'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('foö').isSuccess(), true);
        });

        it("should return true when tested value is '1'", () => {
            assert.equal(new StringGuard().isLowerCase().guard('1').isSuccess(), true);
        });

        it("should return true when tested value is ''", () => {
            assert.equal(new StringGuard().isLowerCase().guard('').isSuccess(), true);
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

    describe('#isMacAddress()', () => {
        it("should return true when tested value is '00-0A-95-9D-68-16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00-0A-95-9D-68-16').isSuccess(), true);
        });

        it("should return true when tested value is '00:0a:95:9d:68:16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00:0a:95:9d:68:16').isSuccess(), true);
        });

        it("should return false when tested value is '00-0a-95-9d-68-16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00-0a-95-9d-68-16').isSuccess(), false);
        });

        it("should return false when tested value is '00:0A:95:9D:68:16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00:0A:95:9D:68:16').isSuccess(), false);
        });

        it("should return false when tested value is '00-0A-95-9G-68-16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00-0A-95-9G-68-16').isSuccess(), false);
        });

        it("should return false when tested value is ''00:0a:95:9d:68:1'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00:0a:95:9d:68:1').isSuccess(), false);
        });

        it("should return false when testedvalue is '000a959d6816'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('000a959d6816').isSuccess(), false);
        });

        it("should return false when tested value is '00:0a:95:9d:68-16'", () => {
            assert.equal(new StringGuard().isMacAddress().guard('00:0a:95:9d:68-16').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isMacAddress().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isMacAddress().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isMacAddress().guard(undefined).isSuccess(), false);
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

    describe('#isOctal()', () => {
        it("should return true when tested value is '10'", () => {
            assert.equal(new StringGuard().isOctal().guard('10').isSuccess(), true);
        });

        it("should return true when tested value is '7'", () => {
            assert.equal(new StringGuard().isOctal().guard('7').isSuccess(), true);
        });

        it("should return true when tested value is '010'", () => {
            assert.equal(new StringGuard().isOctal().guard('010').isSuccess(), true);
        });

        it("should return true when tested value is '0o10'", () => {
            assert.equal(new StringGuard().isOctal().guard('0o10').isSuccess(), true);
        });

        it("should return true when tested value is '0O10'", () => {
            assert.equal(new StringGuard().isOctal().guard('0O10').isSuccess(), true);
        });

        it("should return false when tested value is '8'", () => {
            assert.equal(new StringGuard().isOctal().guard('8').isSuccess(), false);
        });

        it("should return false when tested value is '0b0'", () => {
            assert.equal(new StringGuard().isOctal().guard('0b0').isSuccess(), false);
        });

        it("should return false when tested value is ' 10'", () => {
            assert.equal(new StringGuard().isOctal().guard(' 10').isSuccess(), false);
        });

        it("should return false when tested value is '10 '", () => {
            assert.equal(new StringGuard().isOctal().guard('10 ').isSuccess(), false);
        });

        it("should return false when tested value is ' '", () => {
            assert.equal(new StringGuard().isOctal().guard(' ').isSuccess(), false);
        });

        it("should return false when tested value is ''", () => {
            assert.equal(new StringGuard().isOctal().guard('').isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new StringGuard().isOctal().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new StringGuard().isOctal().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isProgrammingCase()', () => {
        describe("#isProgrammingCase('PascalCase')", () => {
            it("should return true when param is 'PascalCase' and tested value is 'PascalCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('PascalCase').isSuccess(), true);
            });

            it("should return true when param is 'PascalCase' and tested value is 'PaPascalCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('PaPascalCase').isSuccess(), true);
            });

            it("should return true when param is 'PascalCase' and tested value is 'Pa'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('Pa').isSuccess(), true);
            });

            it("should return true when param is 'PascalCase' and tested value is 'P'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('P').isSuccess(), true);
            });

            it("should return true when param is 'PascalCase' and tested value is ''", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('').isSuccess(), true);
            });

            it("should return false when param is 'PascalCase' and tested value is 'PascalCasE'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('PascalCasE').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is 'PascalCAsE'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('PascalCAsE').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is 'PA'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('PA').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is 'PascalCase1more'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('PascalCase').guard('PascalCase1more').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'PascalCase' and tested value is 'camelCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('camelCase').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('PascalCase').guard('quiet_snake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'PascalCase' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('PascalCase').guard('SCREAMING_SNAKE_CASE').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'PascalCase' and tested value is 'kebab-case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('kebab-case').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is 'dot.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard('dot.case').isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is null", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'PascalCase' and tested value is undefined", () => {
                assert.equal(new StringGuard().isProgrammingCase('PascalCase').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isProgrammingCase('camelCase')", () => {
            it("should return true when param is 'camelCase' and tested value is 'camelCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('camelCase').isSuccess(), true);
            });

            it("should return true when param is 'camelCase' and tested value is 'caCamelCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('caCamelCase').isSuccess(), true);
            });

            it("should return true when param is 'camelCase' and tested value is 'cAm'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('cAm').isSuccess(), true);
            });

            it("should return true when param is 'camelCase' and tested value is 'ca'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('ca').isSuccess(), true);
            });

            it("should return true when param is 'camelCase' and tested value is 'c'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('c').isSuccess(), true);
            });

            it("should return true when param is 'camelCase' and tested value is '", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('').isSuccess(), true);
            });

            it("should return false when param is 'camelCase' and tested value is 'camelCasE'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('camelCasE').isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is 'camelCAse'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('camelCAse').isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is 'camelCase1more'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('camelCase').guard('camelCase1more').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'camelCase' and tested value is 'PascalCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('PascalCase').isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('camelCase').guard('quiet_snake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'camelCase' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('camelCase').guard('SCREAMING_SNAKE_CASE').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'camelCase' and tested value is 'kebab-case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('kebab-case').isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is 'dot.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard('dot.case').isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is null", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'camelCase' and tested value is undefined", () => {
                assert.equal(new StringGuard().isProgrammingCase('camelCase').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isProgrammingCase('quiet_snake_case')", () => {
            it("should return true when param is 'quiet_snake_case' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('quiet_snake_case').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quiet_snake_case' and tested value is 'quiet_snake1_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('quiet_snake1_case').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quiet_snake_case' and tested value is 'quiet'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('quiet').isSuccess(), true);
            });

            it("should return true when param is 'quiet_snake_case' and tested value is 'quiet_s'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('quiet_s').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'quiet_snake_case' and tested value is 'qu'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('qu').isSuccess(), true);
            });

            it("should return true when param is 'quiet_snake_case' and tested value is 'q'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('q').isSuccess(), true);
            });

            it("should return true when param is 'quiet_snake_case' and tested value is ''", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('').isSuccess(), true);
            });

            it("should return true when param is 'quiet_snake_case' and tested value is '1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('1').isSuccess(), true);
            });

            it("should return true when param is 'quiet_snake_case' and tested value is '11_1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('11_1').isSuccess(), true);
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'quiet_s_nake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('quiet_s_nake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is '1_11'", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard('1_11').isSuccess(), false);
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'PAscalCase'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('PAscalCase').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'camelCase'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('camelCase').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('SCREAMING_SNAKE_CASE').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'kebab-case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('kebab-case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'dot.case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard('dot.case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is null", () => {
                assert.equal(new StringGuard().isProgrammingCase('quiet_snake_case').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'quiet_snake_case' and tested value is undefined", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('quiet_snake_case').guard(undefined).isSuccess(),
                    false
                );
            });
        });

        describe("#isProgrammingCase('SCREAMING_SNAKE_CASE')", () => {
            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard()
                        .isProgrammingCase('SCREAMING_SNAKE_CASE')
                        .guard('SCREAMING_SNAKE_CASE')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SCREAMING_SNAKE1_CASE'", () => {
                assert.equal(
                    new StringGuard()
                        .isProgrammingCase('SCREAMING_SNAKE_CASE')
                        .guard('SCREAMING_SNAKE1_CASE')
                        .isSuccess(),
                    true
                );
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SCREAMING'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('SCREAMING').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SCREAMING_S'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('SCREAMING_S').isSuccess(),
                    true
                );
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SC'", () => {
                assert.equal(new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('SC').isSuccess(), true);
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is 'S'", () => {
                assert.equal(new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('S').isSuccess(), true);
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is ''", () => {
                assert.equal(new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('').isSuccess(), true);
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is '1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('1').isSuccess(), true);
            });

            it("should return true when param is 'SCREAMING_SNAKE_CASE' and tested value is '11_1'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('11_1').isSuccess(),
                    true
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is 'SCREAMING_S_NAKE_CASE'", () => {
                assert.equal(
                    new StringGuard()
                        .isProgrammingCase('SCREAMING_SNAKE_CASE')
                        .guard('SCREAMING_S_NAKE_CASE')
                        .isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is '1_11'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('1_11').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is 'PascalCase'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('PascalCase').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is 'camelCase'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('camelCase').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('quiet_snake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'quiet_snake_case' and tested value is 'kebab-case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('kebab-case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is 'dot.case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard('dot.case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is null", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard(null).isSuccess(),
                    false
                );
            });

            it("should return false when param is 'SCREAMING_SNAKE_CASE' and tested value is undefined", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('SCREAMING_SNAKE_CASE').guard(undefined).isSuccess(),
                    false
                );
            });
        });

        describe("#isProgrammingCase('kebab-case')", () => {
            it("should return true when param is 'kebab-case' and tested value is 'kebab-case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('kebab-case').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is 'kebab1-case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('kebab1-case').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is 'kebab'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('kebab').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is 'kebab-c'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('kebab-c').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is 'ke'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('ke').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is 'k'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('k').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is ''", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is '1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('1').isSuccess(), true);
            });

            it("should return true when param is 'kebab-case' and tested value is '11-1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('11-1').isSuccess(), true);
            });

            it("should return false when param is 'kebab-case' and tested value is 'keba-b-case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('keba-b-case').isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is '1-11'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('1-11').isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is 'PascalCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('PascalCase').isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is 'camelCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('camelCase').isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('kebab-case').guard('quiet_snake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'kebab-case' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('kebab-case').guard('SCREAMING_SNAKE_CASE').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'kebab-case' and tested value is 'dot.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard('dot.case').isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is null", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'kebab-case' and tested value is undefined", () => {
                assert.equal(new StringGuard().isProgrammingCase('kebab-case').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isProgrammingCase('dot.case')", () => {
            it("should return true when param is 'dot.case' and tested value is 'dot.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('dot.case').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is 'dot1.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('dot1.case').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is 'dot'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('dot').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is 'dot.c'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('dot.c').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is 'do'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('do').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is 'd'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('d').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is ''", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is '1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('1').isSuccess(), true);
            });

            it("should return true when param is 'dot.case' and tested value is '11.1'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('11.1').isSuccess(), true);
            });

            it("should return false when param is 'dot.case' and tested value is 'do.t.case'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('do.t.case').isSuccess(), false);
            });

            it("should return false when param is 'dot.case' and tested value is '1.11'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('1.11').isSuccess(), false);
            });

            it("should return false when param is 'dot.case' and tested value is 'PascalCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('PascalCase').isSuccess(), false);
            });

            it("should return false when param is 'dot.case' and tested value is 'camelCase'", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard('camelCase').isSuccess(), false);
            });

            it("should return false when param is 'dot.case' and tested value is 'quiet_snake_case'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('dot.case').guard('quiet_snake_case').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'dot.case' and tested value is 'SCREAMING_SNAKE_CASE'", () => {
                assert.equal(
                    new StringGuard().isProgrammingCase('dot.case').guard('SCREAMING_SNAKE_CASE').isSuccess(),
                    false
                );
            });

            it("should return false when param is 'dot.case' and tested value is null", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'dot.case' and tested value is undefined", () => {
                assert.equal(new StringGuard().isProgrammingCase('dot.case').guard(undefined).isSuccess(), false);
            });
        });
    });

    describe('#isTrimmed()', () => {
        describe("#isTrimmed('both')", () => {
            it("should return true when param is 'both' and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard('foo').isSuccess(), true);
            });

            it("should return true when param is 'both' and tested value is 'foo bar'", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard('foo bar').isSuccess(), true);
            });

            it("should return true when param is 'both' and tested value is ''", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard('').isSuccess(), true);
            });

            it("should return false when param is 'both' and tested value is ' foo'", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard(' foo').isSuccess(), false);
            });

            it("should return false when param is 'both' and tested value is 'foo '", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard('foo ').isSuccess(), false);
            });

            it("should return false when param is 'both' and tested value is ' foo '", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard(' foo ').isSuccess(), false);
            });

            it("should return false when param is 'both' and tested value is ' '", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard(' ').isSuccess(), false);
            });

            it("should return false when param is 'both' and tested value is null", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'both' and tested value is undefined", () => {
                assert.equal(new StringGuard().isTrimmed('both').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isTrimmed('left')", () => {
            it("should return true when param is 'left' and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard('foo').isSuccess(), true);
            });

            it("should return true when param is 'left' and tested value is 'foo bar'", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard('foo bar').isSuccess(), true);
            });

            it("should return true when param is 'left' and tested value is ''", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard('').isSuccess(), true);
            });

            it("should return true when param is 'left' and tested value is 'foo '", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard('foo ').isSuccess(), true);
            });

            it("should return false when param is 'left' and tested value is ' foo'", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard(' foo').isSuccess(), false);
            });

            it("should return false when param is 'left' and tested value is '  foo'", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard('    foo').isSuccess(), false);
            });

            it("should return false when param is 'left' and tested value is ' foo '", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard(' foo ').isSuccess(), false);
            });

            it("should return false when param is 'left' and tested value is ' '", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard(' ').isSuccess(), false);
            });

            it("should return false when param is 'left' and tested value is null", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'left' and tested value is undefined", () => {
                assert.equal(new StringGuard().isTrimmed('left').guard(undefined).isSuccess(), false);
            });
        });

        describe("#isTrimmed('right')", () => {
            it("should return true when param is 'right' and tested value is 'foo'", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard('foo').isSuccess(), true);
            });

            it("should return true when param is 'right' and tested value is 'foo bar'", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard('foo bar').isSuccess(), true);
            });

            it("should return true when param is 'right' and tested value is ''", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard('').isSuccess(), true);
            });

            it("should return true when param is 'right' and tested value is ' foo'", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard(' foo').isSuccess(), true);
            });

            it("should return false when param is 'right' and tested value is 'foo '", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard('foo ').isSuccess(), false);
            });

            it("should return false when param is 'right' and tested value is 'foo   '", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard('foo    ').isSuccess(), false);
            });

            it("should return false when param is 'right' and tested value is ' foo '", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard(' foo ').isSuccess(), false);
            });

            it("should return false when param is 'right' and tested value is ' '", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard(' ').isSuccess(), false);
            });

            it("should return false when param is 'right' and tested value is null", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard(null).isSuccess(), false);
            });

            it("should return false when param is 'right' and tested value is undefined", () => {
                assert.equal(new StringGuard().isTrimmed('right').guard(undefined).isSuccess(), false);
            });
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

        it("should return true when tested value is ''", () => {
            assert.equal(new StringGuard().isUpperCase().guard('').isSuccess(), true);
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
});
