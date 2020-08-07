import { assert } from 'chai';

import { BooleanGuard } from '../../src/guards/boolean-guard';

describe('Boolean-Guard', () => {
    describe('#isTrue()', () => {
        it('should return true when tested value is true', () => {
            assert.equal(new BooleanGuard().isTrue().guard(true).isSuccess(), true);
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
});
