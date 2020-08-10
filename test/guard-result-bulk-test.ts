import { assert } from 'chai';

import { StringGuard } from '../src/guards/string-guard';
import { GuardResultBulk } from '../src/guard-result-bulk';
import { GuardResult } from '../src/guard-result';

describe('Guard-Result-Bulk', () => {
    describe('#combine()', () => {
        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([new StringGuard().equals('foo').guard('foo')])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([new StringGuard().equals('foo').guard('foo'), new StringGuard().hasMinLength(1).guard('foo')])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return false from last bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    new StringGuard().equals('foo').guard('foo'),
                    new StringGuard().hasMinLength(1).guard('foo'),
                    new StringGuard().hasMinLength(4).guard('foo'),
                ])
                .combine();

            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'string is expected to have min length of 4 but has length of 3');
        });

        it('should return false from second bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    new StringGuard().equals('foo').guard('foo'),
                    new StringGuard().hasMinLength(4).guard('foo'),
                    new StringGuard().hasMinLength(1).guard('foo'),
                    new StringGuard().hasMaxLength(1).guard('foo'),
                ])
                .combine();

            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'string is expected to have min length of 4 but has length of 3');
        });
    });

    describe('#stack()', () => {
        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([new StringGuard().equals('foo').guard('foo')])
                    .stack()[0]
                    .isSuccess(),
                true
            );
        });

        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([new StringGuard().equals('foo').guard('foo'), new StringGuard().equals('bar').guard('bar')])
                    .stack()[0]
                    .isSuccess(),
                true
            );
        });

        it('should return false', () => {
            assert.equal(
                (new GuardResultBulk()
                    .add([new StringGuard().equals('foo').guard('bar', 'toto')])
                    .stack() as GuardResult[])[0].isSuccess(),
                false
            );
        });
    });
});
