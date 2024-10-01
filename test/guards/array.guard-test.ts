import { assert } from 'chai';

import { ArrayGuard } from '../../src/guards/array.guard';

describe('Array-Guard', () => {
    describe('#guard()', () => {
        it('should return false when tested value is 0', () => {
            const value = 0;

            assert.equal(
                new ArrayGuard().guard(value, { customMessage: 'La valeur doit être de type array' }).isSuccess(),
                false
            );

            assert.equal(
                new ArrayGuard().guard(value, { customMessage: 'La valeur doit être de type array' }).getMessage(),
                'La valeur doit être de type array'
            );

            assert.equal(
                new ArrayGuard()
                    .guard(value, { propertyName: 'valeur', customMessage: 'La valeur doit être de type array' })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être de type array'
            );
        });

        it("should return true when param is 'foo' and tested value is ['foo']", () => {
            const param = 'foo';
            const value = ['foo'];

            assert.equal(
                new ArrayGuard()
                    .contains(param)
                    .guard(value, { customMessage: `La valeur doit contenir ${param}` })
                    .isSuccess(),
                true
            );

            assert.equal(
                new ArrayGuard()
                    .contains(param)
                    .guard(value, { customMessage: `La valeur doit contenir ${param}` })
                    .getMessage(),
                undefined
            );
        });

        it("should return false when param is 'bar' and tested value is ['foo']", () => {
            const param = 'bar';
            const value = ['foo'];

            assert.equal(
                new ArrayGuard()
                    .contains(param)
                    .guard(value, { customMessage: `La valeur doit contenir ${param}` })
                    .isSuccess(),
                false
            );

            assert.equal(
                new ArrayGuard()
                    .contains(param)
                    .guard(value, { customMessage: `La valeur doit contenir ${param}` })
                    .getMessage(),
                `La valeur doit contenir ${param}`
            );

            assert.equal(
                new ArrayGuard()
                    .contains(param)
                    .guard(value, { propertyName: 'valeur', customMessage: `La valeur doit contenir ${param}` })
                    .getMessage(),
                `Property valeur has failed the guard validation: La valeur doit contenir ${param}`
            );
        });
    });

    describe('#contains()', () => {
        it("should return true when param is 'foo' and tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().contains('foo').guard(['foo']).isSuccess(), true);
        });

        it("should return true when param is 'foo' and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().contains('foo').guard(['foo', 'bar']).isSuccess(), true);
        });

        it("should return false when param is 'foobar' and tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().contains('foobar').guard(['foo']).isSuccess(), false);
        });

        it("should return false when param is 'foo' and tested value is []", () => {
            assert.equal(new ArrayGuard().contains('foo').guard([]).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is null", () => {
            assert.equal(new ArrayGuard().contains('foo').guard(null).isSuccess(), false);
        });

        it("should return false when param 'foo' and tested value is undefined", () => {
            assert.equal(new ArrayGuard().contains('foo').guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasMaxSize()', () => {
        it("should return true when param is 1 and tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().hasMaxSize(1).guard(['foo']).isSuccess(), true);
        });

        it("should return true when param is 3 and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().hasMaxSize(3).guard(['foo', 'bar']).isSuccess(), true);
        });

        it("should return false when param is 1 and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().hasMaxSize(1).guard(['foo', 'bar']).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new ArrayGuard().hasMaxSize(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new ArrayGuard().hasMaxSize(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasMinSize()', () => {
        it("should return true when param is 1 and tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().hasMinSize(1).guard(['foo']).isSuccess(), true);
        });

        it("should return true when param is 1 and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().hasMinSize(1).guard(['foo', 'bar']).isSuccess(), true);
        });

        it("should return false when param is 3 and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().hasMinSize(3).guard(['foo', 'bar']).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new ArrayGuard().hasMinSize(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new ArrayGuard().hasMinSize(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#hasSize()', () => {
        it("should return true when param is 1 and tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().hasSize(1).guard(['foo']).isSuccess(), true);
        });

        it('should return true when param is 0 and tested value is []', () => {
            assert.equal(new ArrayGuard().hasSize(0).guard([]).isSuccess(), true);
        });

        it("should return false when param is 3 and tested value is ['foo', 'bar']", () => {
            assert.equal(new ArrayGuard().hasSize(3).guard(['foo', 'bar']).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is null', () => {
            assert.equal(new ArrayGuard().hasSize(1).guard(null).isSuccess(), false);
        });

        it('should return false when param is 1 and tested value is undefined', () => {
            assert.equal(new ArrayGuard().hasSize(1).guard(undefined).isSuccess(), false);
        });
    });

    describe('#isEmpty()', () => {
        it('should return true when tested value is []', () => {
            assert.equal(new ArrayGuard().isEmpty().guard([]).isSuccess(), true);
        });

        it("should return false when tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().isEmpty().guard(['foo']).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new ArrayGuard().isEmpty().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new ArrayGuard().isEmpty().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNotEmpty()', () => {
        it("should return true when tested value is ['foo']", () => {
            assert.equal(new ArrayGuard().isNotEmpty().guard(['foo']).isSuccess(), true);
        });

        it('should return false when tested value is []', () => {
            assert.equal(new ArrayGuard().isNotEmpty().guard([]).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new ArrayGuard().isNotEmpty().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new ArrayGuard().isNotEmpty().guard(undefined).isSuccess(), false);
        });
    });
});
