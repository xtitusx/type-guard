"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanGuard = void 0;
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class BooleanGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    isTrue() {
        this.rules = this.addRule({ type: 'isTrue', value: true });
        return this;
    }
    isFalse() {
        this.rules = this.addRule({ type: 'isFalse', value: false });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'isTrue':
            case 'isFalse':
                return value === rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder().withSuccess(false).withMessage(`boolean is not ${rule.value}`).build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a boolean but received ${this.propertyValue}`);
        }
        else if (typeof this.propertyValue !== 'boolean') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a boolean but received ${typeof this.propertyValue}`);
        }
    }
}
exports.BooleanGuard = BooleanGuard;
//# sourceMappingURL=boolean-guard.js.map