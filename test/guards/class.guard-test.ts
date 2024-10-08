import { assert } from 'chai';

import { ClassGuard } from '../../src/guards/class.guard';

describe('Class-Guard', () => {
    describe('#guard()', () => {
        it('should return true when tested value is new Number(1)', () => {
            assert.equal(new ClassGuard().guard(new Number(1)).isSuccess(), true);
        });

        it('should return true when tested value is {a:1}', () => {
            assert.equal(new ClassGuard().guard({ a: 1 }).isSuccess(), true);
        });

        it('should return true when tested value is [1]', () => {
            assert.equal(new ClassGuard().guard(['1']).isSuccess(), true);
        });

        it('should return true when tested value is new Array([1])', () => {
            assert.equal(new ClassGuard().guard(new Array(['1'])).isSuccess(), true);
        });

        it("should return true when tested value is new Map([['k', 'v']]", () => {
            assert.equal(new ClassGuard().guard(new Map([['k', 'v']])).isSuccess(), true);
        });

        it('should return true when tested value is new Set([1]', () => {
            assert.equal(new ClassGuard().guard(new Set([1])).isSuccess(), true);
        });

        it('should return false when tested value is null', () => {
            const guardResult = new ClassGuard().guard(null);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected an Object class instance but received: null');
        });

        it('should return false when tested value is undefined', () => {
            const guardResult = new ClassGuard().guard(undefined);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(
                guardResult.getMessage(),
                'ClassGuard expected an Object class instance but received: undefined'
            );
        });

        it("should return false when tested value is 'foo''", () => {
            const guardResult = new ClassGuard().guard('foo');
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected an Object class instance but received: string');
        });

        it('should return false when tested value is 1', () => {
            const guardResult = new ClassGuard().guard(1);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'ClassGuard expected an Object class instance but received: number');
        });

        it('should return false when tested value is true', () => {
            const guardResult = new ClassGuard().guard(true);
            assert.equal(guardResult.isSuccess(), false);
            assert.equal(
                guardResult.getMessage(),
                'ClassGuard expected an Object class instance but received: boolean'
            );
        });

        it('should return false when tested value is 0', () => {
            const value = 0;

            assert.equal(
                new ClassGuard()
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Object' })
                    .isSuccess(),
                false
            );

            assert.equal(
                new ClassGuard()
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Object' })
                    .getMessage(),
                'La valeur doit être une instance de classe Object'
            );

            assert.equal(
                new ClassGuard()
                    .guard(value, {
                        propertyName: 'valeur',
                        customMessage: 'La valeur doit être une instance de classe Object',
                    })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être une instance de classe Object'
            );
        });

        it('should return true when param is Array and tested value is new Array([1])', () => {
            const value = new Array(['1']);

            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Array' })
                    .isSuccess(),
                true
            );

            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Array' })
                    .getMessage(),
                undefined
            );
        });

        it("should return false when param is Array and tested value is 'foo'", () => {
            const value = 'foo';

            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Array' })
                    .isSuccess(),
                false
            );

            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard(value, { customMessage: 'La valeur doit être une instance de classe Array' })
                    .getMessage(),
                'La valeur doit être une instance de classe Array'
            );

            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard('foo', {
                        propertyName: 'valeur',
                        customMessage: 'La valeur doit être une instance de classe Array',
                    })
                    .getMessage(),
                'Property valeur has failed the guard validation: La valeur doit être une instance de classe Array'
            );
        });
    });

    describe('#isInstanceOf()', () => {
        it('should return true when param is Number and when tested value is new Number(1)', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(new Number(1)).isSuccess(), true);
        });

        it('should return true when param is Object and when tested value is new Number(1)', () => {
            assert.equal(new ClassGuard().isInstanceOf(Object).guard(new Number(1)).isSuccess(), true);
        });

        it('should return true when param is Array and tested value is new Array([1])', () => {
            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Array)
                    .guard(new Array(['1']))
                    .isSuccess(),
                true
            );
        });

        it("should return true when param is Map and tested value is new Map([['k', 'v']]", () => {
            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Map)
                    .guard(new Map([['k', 'v']]))
                    .isSuccess(),
                true
            );
        });

        it('should return true when param is Set and tested value is new Set([1]', () => {
            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Set)
                    .guard(new Set([1]))
                    .isSuccess(),
                true
            );
        });

        it('should return false when param is Map and tested value is new Array([1])', () => {
            assert.equal(
                new ClassGuard()
                    .isInstanceOf(Map)
                    .guard(new Array(['1']))
                    .isSuccess(),
                false
            );
        });

        it('should return false when param is Number and tested value is new String("foo")', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(new String('foo')).isSuccess(), false);
        });

        it('should return false when param is Number and tested value is { a: 1 }', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard({ a: 1 }).isSuccess(), false);
        });

        it('should return false when param is Number and tested value is null', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(null).isSuccess(), false);
        });

        it('should return false when param is Number and tested value is undefined', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(undefined).isSuccess(), false);
        });

        it('should return false when param is undefined and tested value is undefined', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(undefined).isSuccess(), false);
        });

        it('should return false when param is null and tested value is null', () => {
            assert.equal(new ClassGuard().isInstanceOf(Number).guard(null).isSuccess(), false);
        });
    });
});
