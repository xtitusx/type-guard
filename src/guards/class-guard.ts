import { Guard } from './guard';

import { GuardResult } from '../guard-result';

type ClassRule = { type: 'isInstanceOf'; value: Function };

/** @class ClassGuard
 * @extends {Guard<ClassRule>}
 */
export class ClassGuard extends Guard<ClassRule> {
    constructor(rules?: ClassRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if the prototype property of a constructor appears anywhere in the prototype chain of the specified object.
     * @param value number
     */
    public isInstanceOf(value: Function): this {
        this.addRule({ type: 'isInstanceOf', value: value });
        return this;
    }

    /**
     * @override
     * @param rule ClassRule
     * @param value unknown
     */
    protected checkRule(rule: ClassRule, value: unknown): GuardResult {
        switch (rule.type) {
            case 'isInstanceOf':
                return value instanceof rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is expected to be an instance of: ${rule.value.name}`)
                          .build();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === undefined || this.propertyValue === null) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'object') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received: ${typeof this.propertyValue}`
            );
        } else if (Array.isArray(this.propertyValue)) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received: array object`
            );
        } else if (!this.propertyValue.constructor && !this.propertyValue.constructor.name) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a constructor name`);
        }
    }
}
