import { assert } from 'chai';

import { TypeGuard } from '../src/type-guard';

describe('Type-Guard', () => {
    it('should return true when tested value is []', () => {
        assert.equal(TypeGuard.array().guard([]).isSuccess(), true);
    });

    it('should return true when tested value is true', () => {
        assert.equal(TypeGuard.boolean().guard(true).isSuccess(), true);
    });

    it("should return true when tested value is '2015-01-20T00:00:00+02:00'", () => {
        assert.equal(TypeGuard.dateString().guard('2015-01-20T00:00:00+02:00').isSuccess(), true);
    });

    it('should return true when tested value is new Number(1)', () => {
        assert.equal(TypeGuard.class().guard(new Number(1)).isSuccess(), true);
    });

    it('should return true when tested value is undefined', () => {
        assert.equal(TypeGuard.nil().guard(undefined).isSuccess(), true);
    });

    it('should return true when tested value is 1', () => {
        assert.equal(TypeGuard.number().guard(1).isSuccess(), true);
    });

    it("should return true when tested value is 'foo'", () => {
        assert.equal(TypeGuard.string().guard('foo').isSuccess(), true);
    });
});
