import { GuardResult } from './guard-result';
import { Guard } from './guard';

type ClassRule = { type: 'isInstanceOf'; value: Function };

/** @class ClassGuard
 * @extends {Guard<ClassRule>}
 */
export class ClassGuard extends Guard<ClassRule> {
    constructor(rules?: ClassRule[]) {
        super(rules);
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si un objet possède, dans sa chaîne de prototype, la propriété prototype d'un certain constructeur.
     * @param value number
     */
    public isInstanceOf(value: Function): this {
        this.rules = this.addRule({ type: 'isInstanceOf', value: value });
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
                          .withMessage(`Value is expected to be an instance of ${rule.value.name}`)
                          .build();
        }
    }

    /**
     * @override
     */
    protected guardType(): void {
        if (this.propertyValue === null || this.propertyValue === undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'object') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a class instance but received ${typeof this.propertyValue}`
            );
        } else if (!this.propertyValue.constructor && !this.propertyValue.constructor.name) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(`${this.constructor.name} expected a constructor name`);
        }
    }
}
