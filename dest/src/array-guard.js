"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayGuard = void 0;
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class ArrayGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    isEmpty() {
        this.rules = this.addRule({ type: 'isEmpty' });
        return this;
    }
    isNotEmpty() {
        this.rules = this.addRule({ type: 'isNotEmpty' });
        return this;
    }
    hasSize(value) {
        this.rules = this.addRule({ type: 'hasSize', value: value });
        return this;
    }
    hasMinSize(min) {
        this.rules = this.addRule({ type: 'hasMinSize', min: min });
        return this;
    }
    hasMaxSize(max) {
        this.rules = this.addRule({ type: 'hasMaxSize', max: max });
        return this;
    }
    contains(value) {
        this.rules = this.addRule({ type: 'contains', value: value });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'isEmpty':
                return value.length === 0
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object is expected to be empty but has length of ${value.length}`)
                        .build();
            case 'isNotEmpty':
                return value.length !== 0
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object is expected to not be empty but has length of ${value.length}`)
                        .build();
            case 'hasSize':
                return value.length === rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object is expected to have length of ${rule.value} but has length of ${value.length}`)
                        .build();
            case 'hasMinSize':
                return value.length >= rule.min
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object is expected to have min length of ${rule.min} but has length of ${value.length}`)
                        .build();
            case 'hasMaxSize':
                return value.length <= rule.max
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object is expected to have max length of ${rule.max} but has length of ${value.length}`)
                        .build();
            case 'contains':
                return Object.values(value).includes(rule.value)
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Array object does not contain ${rule.value} value`)
                        .build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected an Array object but received ${this.propertyValue}`);
        }
        else if (!Array.isArray(this.propertyValue)) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected an Array object but received ${typeof this.propertyValue}`);
        }
    }
}
exports.ArrayGuard = ArrayGuard;
//# sourceMappingURL=array-guard.js.map