import { assert } from 'chai';

import { Tyr } from '../src/tyr';

describe('Tyr', () => {
    describe('#array()', () => {
        it('should return true when tested value is []', () => {
            assert.equal(Tyr.array().guard([]).isSuccess(), true);
        });

        it("should return true when param is 3 then 2 and tested value is ['foo', 'bar']", () => {
            assert.equal(
                Tyr.array({ overrideRule: true }).hasMinSize(3).hasMinSize(2).guard(['foo', 'bar']).isSuccess(),
                true
            );
        });

        it("should return false when param is 3 then 2 and tested value is ['foo', 'bar']", () => {
            assert.equal(
                Tyr.array({ overrideRule: false }).hasMinSize(3).hasMinSize(2).guard(['foo', 'bar']).isSuccess(),
                false
            );
        });

        it("should return false when param is 3 then 2 and tested value is ['foo', 'bar']", () => {
            assert.equal(Tyr.array().hasMinSize(3).hasMinSize(2).guard(['foo', 'bar']).isSuccess(), false);
        });
    });

    describe('#boolean()', () => {
        it('should return true when tested value is true', () => {
            assert.equal(Tyr.boolean().guard(true).isSuccess(), true);
        });
    });

    describe('#class()', () => {
        it('should return true when tested value is new Number(1)', () => {
            assert.equal(Tyr.class().guard(new Number(1)).isSuccess(), true);
        });
    });

    describe('#dateString()', () => {
        it("should return true when tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(Tyr.dateString().guard('2015-01-20T00:00:00+02:00').isSuccess(), true);
        });

        it("should return true when param is '2014-01-20T00:00:00+02:00' then '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                Tyr.dateString({ overrideRule: true })
                    .isSame('2014-01-20T00:00:00+02:00')
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                true
            );
        });

        it("should return false when param is '2014-01-20T00:00:00+02:00' then '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                Tyr.dateString({ overrideRule: false })
                    .isSame('2014-01-20T00:00:00+02:00')
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                false
            );
        });

        it("should return false when param is '2014-01-20T00:00:00+02:00' then '2015-01-20T00:00:00+02:00' and tested value is '2015-01-20T00:00:00+02:00'", () => {
            assert.equal(
                Tyr.dateString()
                    .isSame('2014-01-20T00:00:00+02:00')
                    .isSame('2015-01-20T00:00:00+02:00')
                    .guard('2015-01-20T00:00:00+02:00')
                    .isSuccess(),
                false
            );
        });
    });

    describe('#nil()', () => {
        it('should return true when tested value is undefined', () => {
            assert.equal(Tyr.nil().guard(undefined).isSuccess(), true);
        });
    });

    describe('#number()', () => {
        it('should return true when tested value is 1', () => {
            assert.equal(Tyr.number().guard(1).isSuccess(), true);
        });

        it('should return true when param is 2 then 3 and tested value is 9', () => {
            assert.equal(Tyr.number({ overrideRule: true }).isMultiple(2).isMultiple(3).guard(9).isSuccess(), true);
        });

        it('should return true when param is 2 then 3 and tested value is 6', () => {
            assert.equal(Tyr.number({ overrideRule: false }).isMultiple(2).isMultiple(3).guard(6).isSuccess(), true);
        });

        it('should return false when param is 2 then 3 and tested value is 9', () => {
            assert.equal(Tyr.number({ overrideRule: false }).isMultiple(2).isMultiple(3).guard(9).isSuccess(), false);
        });

        it('should return false when param is 2 then 3 and tested value is 9', () => {
            assert.equal(Tyr.number().isMultiple(2).isMultiple(3).guard(9).isSuccess(), false);
        });
    });

    describe('#string()', () => {
        it("should return true when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(
                Tyr.string({ overrideRule: true }).equals('foobar').equals('foo').guard('foo').isSuccess(),
                true
            );
        });

        it("should return false when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(
                Tyr.string({ overrideRule: false }).equals('foobar').equals('foo').guard('foo').isSuccess(),
                false
            );
        });

        it("should return false when param is 'foobar' then 'foo' and tested value is 'foo'", () => {
            assert.equal(Tyr.string().equals('foobar').equals('foo').guard('foo').isSuccess(), false);
        });
    });
});
