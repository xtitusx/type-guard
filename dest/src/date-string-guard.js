"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateStringGuard = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class DateStringGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    isSameOrBefore(value) {
        this.rules = this.addRule({ type: 'isSameOrBefore', value: value });
        return this;
    }
    isSameOrAfter(value) {
        this.rules = this.addRule({ type: 'isSameOrAfter', value: value });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'isSameOrBefore':
                return dayjs_1.default(value).isSameOrBefore(rule.value)
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`dateString is expected to be the same or before ${rule.value} but is after ${value}`)
                        .build();
            case 'isSameOrAfter':
                return dayjs_1.default(value).isSameOrAfter(rule.value)
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`dateString is expected to be the same or after ${rule.value} but is before ${value}`)
                        .build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a string but received ${this.propertyValue}`);
        }
        else if (typeof this.propertyValue !== 'string' || !dayjs_1.default(this.propertyValue).isValid()) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a dateString but received ${typeof this.propertyValue}`);
        }
    }
}
exports.DateStringGuard = DateStringGuard;
//# sourceMappingURL=date-string-guard.js.map