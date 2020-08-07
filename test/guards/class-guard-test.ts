import { assert } from 'chai';

import { ClassGuard } from '../../src/guards/class-guard';

describe('Class-Guard', () => {
    describe('#isInstanceOf()', () => {
        it('should return true when tested value is Number(1)', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(new Number(1)).isSuccess(), true);
        });

        it('should return false when tested value is String("foo")', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(new String('foo')).isSuccess(), false);
        });

        it('should return false when tested value is null', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(null).isSuccess(), false);
        });

        it('should return false when tested value is undefined', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(undefined).isSuccess(), false);
        });
    });
});
