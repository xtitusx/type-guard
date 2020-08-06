"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassGuard = void 0;
const guard_result_1 = require("./guard-result");
const guard_1 = require("./guard");
class ClassGuard extends guard_1.Guard {
    constructor(rules) {
        super(rules);
    }
    isInstanceOf(value) {
        this.rules = this.addRule({ type: 'isInstanceOf', value: value });
        return this;
    }
    checkRule(rule, value) {
        switch (rule.type) {
            case 'isInstanceOf':
                return value instanceof rule.value
                    ? new guard_result_1.GuardResult.Builder().withSuccess(true).build()
                    : new guard_result_1.GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(`Value is expected to be an instance of ${rule.value.name}`)
                        .build();
        }
    }
    guardType() {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a class instance but received ${this.propertyValue}`);
        }
        else if (typeof this.propertyValue !== 'object') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a class instance but received ${typeof this.propertyValue}`);
        }
        else if (!this.propertyValue.constructor && !this.propertyValue.constructor.name) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a constructor name`);
        }
    }
}
exports.ClassGuard = ClassGuard;
//# sourceMappingURL=class-guard.js.map