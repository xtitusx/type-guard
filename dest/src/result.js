"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(success, guardResult, value) {
        this.success = success;
        this.guardResult = guardResult;
        this.value = value;
    }
    isSuccess() {
        return this.success;
    }
    getGuardResult() {
        return this.guardResult;
    }
    getValue() {
        if (this.success) {
            return this.value;
        }
        throw new Error(this.guardResult.getMessage());
    }
    static success(value) {
        return new Result(true, null, value);
    }
    static fail(guardResult) {
        return new Result(false, guardResult);
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map