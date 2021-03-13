import { assert } from 'chai';

import { GuardResultBulk } from '../src/core/guard-result-bulk';
import { GuardResult } from '../src/core/guard-result';
import { TypeGuard } from '../src/type-guard';

describe('Guard-Result-Bulk', () => {
    describe('#combine()', () => {
        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([TypeGuard.string().equals('foo').guard('foo')])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([
                        TypeGuard.string().equals('foo').guard('foo'),
                        TypeGuard.string().hasMinLength(1).guard('foo'),
                    ])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return false from last bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    TypeGuard.string().equals('foo').guard('foo'),
                    TypeGuard.string().hasMinLength(1).guard('foo'),
                    TypeGuard.string().hasMinLength(4).guard('foo'),
                ])
                .combine();

            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'string is expected to have min length of 4 but has length of: 3');
        });

        it('should return false from second bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    TypeGuard.string().equals('foo').guard('foo'),
                    TypeGuard.string().hasMinLength(4).guard('foo'),
                    TypeGuard.string().hasMinLength(1).guard('foo'),
                    TypeGuard.string().hasMaxLength(1).guard('foo'),
                ])
                .combine();

            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'string is expected to have min length of 4 but has length of: 3');
        });
    });

    describe('#stack()', () => {
        it('should return [ true ]', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([TypeGuard.string().equals('foo').guard('foo')])
                    .stack()[0]
                    .isSuccess(),
                true
            );
        });

        it('should return [ false ]', () => {
            assert.equal(
                (new GuardResultBulk()
                    .add([TypeGuard.string().equals('foo').guard('bar', 'toto')])
                    .stack() as GuardResult[])[0].isSuccess(),
                false
            );
        });

        it('should return [ false ]', () => {
            const guardResultBulk = new GuardResultBulk()
                .add([TypeGuard.string().equals('foo').guard('foo'), TypeGuard.string().equals('foo').guard('bar')])
                .stack();

            assert.equal(guardResultBulk[0].isSuccess(), false);
        });

        it('should return [ false, false ]', () => {
            const guardResultBulk = new GuardResultBulk()
                .add([
                    TypeGuard.string().equals('foo').guard('foo'),
                    TypeGuard.string().equals('foo').guard('bar'),
                    TypeGuard.string().equals('foo').guard('bar'),
                ])
                .stack();
            assert.equal(guardResultBulk[0].isSuccess(), false);
            assert.equal(guardResultBulk[1].isSuccess(), false);
        });
    });
});
