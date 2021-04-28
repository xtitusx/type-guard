import { assert } from 'chai';

import { Tyr } from '../src/tyr';

describe('Type-Guard', () => {
    it('should return true when tested value is []', () => {
        assert.equal(Tyr.array().guard([]).isSuccess(), true);
    });

    it('should return true when tested value is true', () => {
        assert.equal(Tyr.boolean().guard(true).isSuccess(), true);
    });

    it("should return true when tested value is '2015-01-20T00:00:00+02:00'", () => {
        assert.equal(Tyr.dateString().guard('2015-01-20T00:00:00+02:00').isSuccess(), true);
    });

    it('should return true when tested value is new Number(1)', () => {
        assert.equal(Tyr.class().guard(new Number(1)).isSuccess(), true);
    });

    it('should return true when tested value is undefined', () => {
        assert.equal(Tyr.nil().guard(undefined).isSuccess(), true);
    });

    it('should return true when tested value is 1', () => {
        assert.equal(Tyr.number().guard(1).isSuccess(), true);
    });

    it("should return true when tested value is 'foo'", () => {
        assert.equal(Tyr.string().guard('foo').isSuccess(), true);
    });
});
