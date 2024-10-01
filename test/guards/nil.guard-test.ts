import { assert } from 'chai';

import { NilGuard } from '../../src/guards/nil.guard';

describe('Nil-Guard', () => {
    describe('#guard()', () => {
        it('should return true when param tested value is null', () => {
            const value = null;

            assert.equal(
                new NilGuard().isNull().guard(value, { customMessage: 'La valeur doit être nulle' }).isSuccess(),
                true
            );

            assert.equal(
                new NilGuard().isNull().guard(value, { customMessage: 'La valeur doit être nulle' }).getMessage(),
                undefined
            );
        });

        it("should return false when tested value is 'foo'", () => {
            const value = 'foo';

            assert.equal(
                new NilGuard().isNull().guard(value, { customMessage: 'La valeur doit être nulle' }).isSuccess(),
                false
            );

            assert.equal(
                new NilGuard().isNull().guard(value, { customMessage: 'La valeur doit être nulle' }).getMessage(),
                'La valeur doit être nulle'
            );

            assert.equal(
                new NilGuard()
                    .isNull()
                    .guard('foo', { propertyName: 'valeur', customMessage: 'La valeur doit être nulle' })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être nulle'
            );
        });
    });

    describe('#isNil()', () => {
        it('should return true when tested value is undefined', () => {
            assert.equal(new NilGuard().isNil().guard(undefined).isSuccess(), true);
        });

        it('should return true when tested value is null', () => {
            assert.equal(new NilGuard().isNil().guard(null).isSuccess(), true);
        });

        it('should return false when tested value is ""', () => {
            assert.equal(new NilGuard().isNil().guard('').isSuccess(), false);
        });
    });

    describe('#isNotNil()', () => {
        it('should return true when tested value is null', () => {
            assert.equal(new NilGuard().isNotNil().guard('').isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NilGuard().isNotNil().guard(undefined).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NilGuard().isNotNil().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNotNull()', () => {
        it('should return true when tested value is null', () => {
            assert.equal(new NilGuard().isNotNull().guard(undefined).isSuccess(), true);
        });

        it('should return true when tested value is ""', () => {
            assert.equal(new NilGuard().isNotNull().guard('').isSuccess(), true);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NilGuard().isNotNull().guard(undefined).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NilGuard().isNotNull().guard(null).isSuccess(), false);
        });
    });

    describe('#isNotUndefined()', () => {
        it('should return true when tested value is null', () => {
            assert.equal(new NilGuard().isNotUndefined().guard(null).isSuccess(), true);
        });

        it('should return true when tested value is ""', () => {
            assert.equal(new NilGuard().isNotUndefined().guard('').isSuccess(), true);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NilGuard().isNotUndefined().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isNull()', () => {
        it('should return true when tested value is null', () => {
            assert.equal(new NilGuard().isNull().guard(null).isSuccess(), true);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new NilGuard().isNull().guard(undefined).isSuccess(), false);
        });

        it('should return false when tested value is ""', () => {
            assert.equal(new NilGuard().isNull().guard('').isSuccess(), false);
        });
    });

    describe('#isUndefined()', () => {
        it('should return true when tested value is undefined', () => {
            assert.equal(new NilGuard().isUndefined().guard(undefined).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new NilGuard().isUndefined().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is ""', () => {
            assert.equal(new NilGuard().isUndefined().guard('').isSuccess(), false);
        });
    });
});
