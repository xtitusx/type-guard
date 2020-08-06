"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardResult = void 0;
class GuardResult {
    constructor(build) {
        if (build) {
            this.success = build.success;
            this.message = build.message;
            this.propertyName = build.propertyName;
        }
    }
    isSuccess() {
        return this.success;
    }
    setSuccess(success) {
        this.success = success;
    }
    getMessage() {
        return this.propertyName
            ? `Property ${this.propertyName} has failed the guard validation: ${this.message}`
            : this.message;
    }
    setMessage(message) {
        this.message = message;
    }
    getPropertyName() {
        return this.propertyName;
    }
    setPropertyName(propertyName) {
        this.propertyName = propertyName;
    }
    static get Builder() {
        return class Builder {
            constructor() {
            }
            withSuccess(success) {
                this.success = success;
                return this;
            }
            withMessage(message) {
                this.message = message;
                return this;
            }
            withPropertyName(propertyName) {
                this.propertyName = propertyName;
                return this;
            }
            build() {
                return new GuardResult(this);
            }
        };
    }
}
exports.GuardResult = GuardResult;
//# sourceMappingURL=guard-result.js.map