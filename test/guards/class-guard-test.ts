import { assert } from 'chai';

import { ClassGuard } from '../../src/guards/class-guard';

describe('Class-Guard', () => {
    describe('#guard()', () => {
        it('should return true when tested value is Number(1)', () => {
            assert.equal(new ClassGuard().guard(new Number(1)).isSuccess(), true);
        });

        it('should return true when tested value is {a:1}', () => {
            assert.equal(new ClassGuard().guard({ a: 1 }).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            const guardResult = new ClassGuard().guard(null);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: null');
        });

        it('should return false when tested value is undefined', () => {
            const guardResult = new ClassGuard().guard(undefined);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: undefined');
        });

        it("should return false when tested value is 'foo''", () => {
            const guardResult = new ClassGuard().guard('foo');
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: string');
        });

        it('should return false when tested value is 1', () => {
            const guardResult = new ClassGuard().guard(1);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: number');
        });
        it('should return false when tested value is true', () => {
            const guardResult = new ClassGuard().guard(true);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: boolean');
        });

        it('should return false when tested value is [1]', () => {
            const guardResult = new ClassGuard().guard([1]);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected a class instance but received: array object');
        });
    });

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
