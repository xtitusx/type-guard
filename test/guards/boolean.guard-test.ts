import { assert } from 'chai';

import { BooleanGuard } from '../../src/guards/boolean.guard';

describe('Boolean-Guard', () => {
    describe('#guard()', () => {
        it('should return false when tested value is 0', () => {
            const value = 0;

            assert.equal(
                new BooleanGuard().guard(value, { customMessage: 'La valeur doit être de type boolean' }).isSuccess(),
                false
            );

            assert.equal(
                new BooleanGuard().guard(value, { customMessage: 'La valeur doit être de type boolean' }).getMessage(),
                'La valeur doit être de type boolean'
            );

            assert.equal(
                new BooleanGuard()
                    .guard(value, { propertyName: 'valeur', customMessage: 'La valeur doit être de type boolean' })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être de type boolean'
            );
        });

        it('should return true when tested value is true', () => {
            const value = true;

            assert.equal(
                new BooleanGuard().isTrue().guard(value, { customMessage: 'La valeur doit être vraie' }).isSuccess(),
                true
            );

            assert.equal(
                new BooleanGuard().isTrue().guard(value, { customMessage: 'La valeur doit être vraie' }).getMessage(),
                undefined
            );
        });

        it('should return false when tested value is false', () => {
            const value = false;

            assert.equal(
                new BooleanGuard().isTrue().guard(value, { customMessage: 'La valeur doit être vraie' }).isSuccess(),
                false
            );

            assert.equal(
                new BooleanGuard().isTrue().guard(value, { customMessage: 'La valeur doit être vraie' }).getMessage(),
                'La valeur doit être vraie'
            );

            assert.equal(
                new BooleanGuard()
                    .isTrue()
                    .guard(value, { propertyName: 'valeur', customMessage: 'La valeur doit être vraie' })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être vraie'
            );
        });
    });

    describe('#isFalse()', () => {
        it('should return true when tested value is false', () => {
            assert.equal(new BooleanGuard().isFalse().guard(false).isSuccess(), true);
        });

        it('should return false when tested value is true', () => {
            assert.equal(new BooleanGuard().isFalse().guard(true).isSuccess(), false);
        });

        it("should return false when tested value is 'false'", () => {
            assert.equal(new BooleanGuard().isFalse().guard('false').isSuccess(), false);
        });

        it('should return false when tested value is 0', () => {
            assert.equal(new BooleanGuard().isFalse().guard(0).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new BooleanGuard().isFalse().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new BooleanGuard().isFalse().guard(undefined).isSuccess(), false);
        });
    });

    describe('#isTrue()', () => {
        it('should return true when tested value is true', () => {
            assert.equal(new BooleanGuard().isTrue().guard(true).isSuccess(), true);
        });

        it('should return true when tested value is true', () => {
            assert.equal(
                new BooleanGuard()
                    .isTrue()
                    .guard(1 > 0)
                    .isSuccess(),
                true
            );
        });

        it('should return false when tested value is false', () => {
            assert.equal(new BooleanGuard().isTrue().guard(false).isSuccess(), false);
        });

        it("should return false when tested value is 'true'", () => {
            assert.equal(new BooleanGuard().isTrue().guard('true').isSuccess(), false);
        });

        it('should return false when tested value is 1', () => {
            assert.equal(new BooleanGuard().isTrue().guard(1).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new BooleanGuard().isTrue().guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new BooleanGuard().isTrue().guard(undefined).isSuccess(), false);
        });
    });
});
