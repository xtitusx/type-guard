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
    public checkRule(rule: ClassRule, value: unknown): GuardResult {
        switch (rule.type) {
            case 'isInstanceOf':
                return value instanceof rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`Value is expected to be an instance of: ${rule.value.name}`)
                          .build();
        }
    }

    /**
     * @override
     */
    protected guardType(): void {
        if (this.propertyValue === null || undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'object') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received: ${typeof this.propertyValue}`
            );
        } else if (!this.propertyValue.constructor && !this.propertyValue.constructor.name) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a constructor name`);
        }
    }
}
