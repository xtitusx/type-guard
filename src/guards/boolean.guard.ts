import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

type BooleanRule = { type: 'isFalse'; value: false } | { type: 'isTrue'; value: true };

export class BooleanGuard extends Guard<BooleanRule> {
    constructor() {
        super();
    }

    /**
     * Checks if value is a false boolean.
     * @remarks Chainable method.
     */
    public isFalse(): this {
        this.addRule({ type: 'isFalse', value: false });
        return this;
    }

    /**
     * Checks if value is a true boolean.
     * @remarks Chainable method.
     */
    public isTrue(): this {
        this.addRule({ type: 'isTrue', value: true });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
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
        if (this.propertyValue === undefined || this.propertyValue === null) {
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
