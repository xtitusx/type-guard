import { assert } from 'chai';

import { GuardResultBulk } from '../src/core/guard-result-bulk';
import { Tyr } from '../src/tyr';

describe('Guard-Result-Bulk', () => {
    describe('#combine()', () => {
        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([Tyr.string().equals('foo').guard('foo')])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([Tyr.string().equals('foo').guard('foo'), Tyr.string().hasMinLength(1).guard('foo')])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return true', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([
                        undefined,
                        Tyr.string().equals('foo').guard('foo'),
                        Tyr.string().hasMinLength(1).guard('foo'),
                    ])
                    .combine()
                    .isSuccess(),
                true
            );
        });

        it('should return false from last bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    Tyr.string().equals('foo').guard('foo'),
                    Tyr.string().hasMinLength(1).guard('foo'),
                    Tyr.string().hasMinLength(4).guard('foo'),
                ])
                .combine();

            assert.equal(guardResult.isSuccess(), false);
            assert.equal(guardResult.getMessage(), 'string is expected to have min length of 4 but has length of: 3');
        });

        it('should return false from second bulked guard', () => {
            const guardResult = new GuardResultBulk()
                .add([
                    Tyr.string().equals('foo').guard('foo'),
                    Tyr.string().hasMinLength(4).guard('foo'),
                    Tyr.string().hasMinLength(1).guard('foo'),
                    Tyr.string().hasMaxLength(1).guard('foo'),
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
                    .add([Tyr.string().equals('foo').guard('foo')])
                    .stack()[0]
                    .isSuccess(),
                true
            );
        });

        it('should return [ true ]', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([undefined, Tyr.string().equals('foo').guard('foo')])
                    .stack()[0]
                    .isSuccess(),
                true
            );
        });

        it('should return [ false ]', () => {
            assert.equal(
                new GuardResultBulk()
                    .add([Tyr.string().equals('foo').guard('bar', 'bar')])
                    .stack()[0]
                    .isSuccess(),
                false
            );
        });

        it('should return [ false ]', () => {
            const guardResultBulk = new GuardResultBulk()
                .add([Tyr.string().equals('foo').guard('foo'), Tyr.string().equals('foo').guard('bar')])
                .stack();

            assert.equal(guardResultBulk[0].isSuccess(), false);
            assert.equal(guardResultBulk[0].getMessage(), 'string is expected to be equal to foo but is not: bar');
        });

        it('should return [ false, false ]', () => {
            const guardResultBulk = new GuardResultBulk()
                .add([
                    Tyr.string().equals('foo').guard('foo'),
                    Tyr.string().equals('foo').guard('bar'),
                    Tyr.string().equals('bar').guard('foo'),
                ])
                .stack();
            assert.equal(guardResultBulk[0].isSuccess(), false);
            assert.equal(guardResultBulk[0].getMessage(), 'string is expected to be equal to foo but is not: bar');
            assert.equal(guardResultBulk[1].isSuccess(), false);
            assert.equal(guardResultBulk[1].getMessage(), 'string is expected to be equal to bar but is not: foo');
        });
    });
});
