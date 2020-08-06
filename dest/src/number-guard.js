"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberGuard = void 0;
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class NumberGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    equals(value) {
        this.rules = this.addRule({ type: 'equals', value: value });
        return this;
    }
    isMin(min) {
        this.rules = this.addRule({ type: 'isMin', min: min });
        return this;
    }
    isMax(max) {
        this.rules = this.addRule({ type: 'isMax', max: max });
        return this;
    }
    isIn(min, max) {
        this.rules = this.addRule({ type: 'isIn', min: min, max: max });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`number is expected to be ${rule.value} but is ${value}`)
                        .build();
            case 'isMin':
                return value >= rule.min
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`number is expected to be equal or greater than ${rule.min} but is smaller ${value}`)
                        .build();
            case 'isMax':
                return value <= rule.max
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`number is expected to be equal or smaller than ${rule.max} but is greater ${value}`)
                        .build();
            case 'isIn':
                return value >= rule.min && value <= rule.max
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`number is expected to be within range ${rule.min} to ${rule.max} but is ${value}`)
                        .build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a number but received ${this.propertyValue}`);
        }
        else if (typeof this.propertyValue !== 'number') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a number but received ${typeof this.propertyValue}`);
        }
    }
}
exports.NumberGuard = NumberGuard;
//# sourceMappingURL=number-guard.js.map