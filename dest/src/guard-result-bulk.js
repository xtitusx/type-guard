"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardResultBulk = void 0;
const guard_result_1 = require("./guard-result");
class GuardResultBulk {
    constructor() {
        this.guardResults = [];
    }
    add(guardResults) {
        if (guardResults) {
            Array.isArray(guardResults)
                ? this.guardResults.push(...guardResults)
                : this.guardResults.push(guardResults);
        }
        return this;
    }
    combine() {
        for (const guardResult of this.guardResults) {
            if (guardResult && !guardResult.isSuccess()) {
                return guardResult;
            }
        }
        return new guard_result_1.GuardResult.Builder().withSuccess(true).build();
    }
    stack() {
        throw new Error('Method not implemented.');
    }
}
exports.GuardResultBulk = GuardResultBulk;
//# sourceMappingURL=guard-result-bulk.js.map