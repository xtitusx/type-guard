import { GuardResult } from '../guard-result';
import { Guard } from './guard';

type NumberRule =
    | { type: 'equals'; value: number }
    | { type: 'isMin'; min: number }
    | { type: 'isMax'; max: number }
    | { type: 'isIn'; min: number; max: number };

/** @class NumberGuard
 * @extends {Guard<NumberRule>}
 */
export class NumberGuard extends Guard<NumberRule> {
    constructor(rules?: NumberRule[]) {
        super(rules);
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie une égalité de nombres.
     * @param value number
     */
    public equals(value: number): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la valeur minimale d'un nombre.
     * @param min number
     */
    public isMin(min: number): this {
        this.addRule({ type: 'isMin', min: min });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la valeur maximale d'un nombre.
     * @param max number
     */
    public isMax(max: number): this {
        this.addRule({ type: 'isMax', max: max });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie l'appartenance d'un nombre à un intervalle fermé.
     * @param min number
     * @param max number
     */
    public isIn(min: number, max: number): this {
        this.addRule({ type: 'isIn', min: min, max: max });
        return this;
    }

    /**
     * @override
     * @param rule NumberRule
     * @param value number
     */
    public checkRule(rule: NumberRule, value: number): GuardResult {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be ${rule.value} but is ${value}`)
                          .build();
            case 'isMin':
                return value >= rule.min
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be equal or greater than ${rule.min} but is smaller ${value}`
                          )
                          .build();
            case 'isMax':
                return value <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be equal or smaller than ${rule.max} but is greater ${value}`
                          )
                          .build();
            case 'isIn':
                return value >= rule.min && value <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be within range ${rule.min} to ${rule.max} but is ${value}`
                          )
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
                `${this.constructor.name} expected a number but received ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'number') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a number but received ${typeof this.propertyValue}`
            );
        }
    }
}
