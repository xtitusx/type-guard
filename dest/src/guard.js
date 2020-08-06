"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const guard_result_1 = require("./guard-result");
class Guard {
    constructor(rules) {
        this.rules = Array.isArray(rules) ? rules : [];
    }
    getCombinedGuardResult() {
        return this.combinedGuardResult;
    }
    addRule(rule) {
        const filtered = this.rules.filter((r) => r.type !== rule.type);
        return [...filtered, rule];
    }
    guard(propertyValue, propertyName) {
        this.propertyValue = propertyValue;
        this.combinedGuardResult = new guard_result_1.GuardResult.Builder().withSuccess(true).withPropertyName(propertyName).build();
        this.guardType();
        if (!this.getCombinedGuardResult().isSuccess()) {
            return this.getCombinedGuardResult();
        }
        for (const rule of this.rules) {
            const guardResult = this.checkRule(rule, propertyValue);
            if (!guardResult.isSuccess()) {
                this.getCombinedGuardResult().setSuccess(false);
                this.getCombinedGuardResult().setMessage(guardResult.getMessage());
                return this.getCombinedGuardResult();
            }
        }
        return this.getCombinedGuardResult();
    }
}
exports.Guard = Guard;
//# sourceMappingURL=guard.js.map