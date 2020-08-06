"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringGuard = void 0;
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class StringGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    equals(value) {
        this.rules = this.addRule({ type: 'equals', value: value });
        return this;
    }
    contains(value) {
        this.rules = this.addRule({ type: 'contains', value: value });
        return this;
    }
    matches(value) {
        this.rules = this.addRule({ type: 'matches', value: value });
        return this;
    }
    isEmpty() {
        this.rules = this.addRule({ type: 'isEmpty' });
        return this;
    }
    isNotEmpty() {
        this.rules = this.addRule({ type: 'isNotEmpty' });
        return this;
    }
    hasLength(value) {
        this.rules = this.addRule({ type: 'hasLength', value: value });
        return this;
    }
    hasMinLength(min) {
        this.rules = this.addRule({ type: 'hasMinLength', min: min });
        return this;
    }
    hasMaxLength(max) {
        this.rules = this.addRule({ type: 'hasMaxLength', max: max });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to be ${rule.value} but is ${value}`)
                        .build();
            case 'contains':
                return value.indexOf(rule.value) !== -1
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to contain ${rule.value} but is ${value}`)
                        .build();
            case 'matches':
                return value.match(rule.value) !== null
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to match ${rule.value} regex but is ${value}`)
                        .build();
            case 'isEmpty':
                return value.length === 0
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to be empty but has length of ${value.length}`)
                        .build();
            case 'isNotEmpty':
                return value.length !== 0
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to not be empty but has length of ${value.length}`)
                        .build();
            case 'hasLength':
                return value.length === rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to have length of ${rule.value} but has length of ${value.length}`)
                        .build();
            case 'hasMinLength':
                return value.length >= rule.min
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to have min length of ${rule.min} but has length of ${value.length}`)
                        .build();
            case 'hasMaxLength':
                return value.length <= rule.max
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`string is expected to have max length of ${rule.max} but has length of ${value.length}`)
                        .build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a string but received ${this.propertyValue}`);
        }
        else if (typeof this.propertyValue !== 'string') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a string but received ${typeof this.propertyValue}`);
        }
    }
}
exports.StringGuard = StringGuard;
//# sourceMappingURL=string-guard.js.map