import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

type ClassRule = { type: 'isInstanceOf'; value: Function };

export class ClassGuard extends Guard<ClassRule> {
    constructor(rules?: ClassRule[]) {
        super(rules);
    }

    /**
     * Checks if the prototype property of the param constructor appears anywhere in the prototype chain of the guarded object.
     * @remarks Chainable method.
     * @param value
     * @see {@link https://javascript.info/instanceof}
     */
    public isInstanceOf(value: Function): this {
        this.addRule({ type: 'isInstanceOf', value: value });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
     */
    protected checkRule(rule: ClassRule, value: unknown): GuardResult {
        switch (rule.type) {
            case 'isInstanceOf':
                return value instanceof rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is expected to be a class instance of: ${rule.value.name}`)
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
                `${this.constructor.name} expected an Object class instance but received: ${this.propertyValue}`
            );
        } else if (!(this.propertyValue instanceof Object)) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected an Object class instance but received: ${typeof this.propertyValue}`
            );
        }
    }
}
