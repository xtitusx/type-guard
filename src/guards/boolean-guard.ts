import { Guard } from './guard';

import { GuardResult } from '../guard-result';

type BooleanRule = { type: 'isTrue'; value: true } | { type: 'isFalse'; value: false };

/** @class BooleanGuard
 * @extends {Guard<BooleanRule>}
 */
export class BooleanGuard extends Guard<BooleanRule> {
    constructor(rules?: BooleanRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is a true boolean.
     */
    public isTrue(): this {
        this.addRule({ type: 'isTrue', value: true });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is a false boolean.
     */
    public isFalse(): this {
        this.addRule({ type: 'isFalse', value: false });
        return this;
    }

    /**
     * @override
     * @param rule BooleanRule
     * @param value boolean
     */
    protected checkRule(rule: BooleanRule, value: boolean): GuardResult {
        switch (rule.type) {
            case 'isTrue':
            case 'isFalse':
                return value === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withMessage(`boolean is expected to be ${rule.value} but is not: ${value}`)
                          .build();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === null || undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a boolean but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'boolean') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a boolean but received: ${typeof this.propertyValue}`
            );
        }
    }
}
