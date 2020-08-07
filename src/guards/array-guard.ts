import { Guard } from './guard';
import { GuardResult } from '../guard-result';

type ArrayRule =
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasSize'; value: number }
    | { type: 'hasMinSize'; min: number }
    | { type: 'hasMaxSize'; max: number }
    | { type: 'contains'; value: any };

/** @class ArrayGuard
 * @extends {Guard<ArrayRule>}
 */
export class ArrayGuard extends Guard<ArrayRule> {
    constructor(rules?: ArrayRule[]) {
        super(rules);
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si un objet Array est vide.
     */
    public isEmpty(): this {
        this.rules = this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si un objet Array n'est pas vide.
     */
    public isNotEmpty(): this {
        this.rules = this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la taille exacte d'un objet Array.
     * @param value number
     */
    public hasSize(value: number): this {
        this.rules = this.addRule({ type: 'hasSize', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la taille minimale d'un objet Array.
     * @param min number
     */
    public hasMinSize(min: number): this {
        this.rules = this.addRule({ type: 'hasMinSize', min: min });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la taille maximale d'un objet Array.
     * @param max number
     */
    public hasMaxSize(max: number): this {
        this.rules = this.addRule({ type: 'hasMaxSize', max: max });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si un objet Array contient un élément.
     * @param value any
     */
    public contains(value: unknown): this {
        this.rules = this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @override
     * @param rule ArrayRule
     * @param value Array<unknown>
     */
    public checkRule(rule: ArrayRule, value: Array<unknown>): GuardResult {
        switch (rule.type) {
            case 'isEmpty':
                return value.length === 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`Array object is expected to be empty but has length of ${value.length}`)
                          .build();
            case 'isNotEmpty':
                return value.length !== 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`Array object is expected to not be empty but has length of ${value.length}`)
                          .build();
            case 'hasSize':
                return value.length === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `Array object is expected to have length of ${rule.value} but has length of ${value.length}`
                          )
                          .build();
            case 'hasMinSize':
                return value.length >= rule.min
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `Array object is expected to have min length of ${rule.min} but has length of ${value.length}`
                          )
                          .build();
            case 'hasMaxSize':
                return value.length <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `Array object is expected to have max length of ${rule.max} but has length of ${value.length}`
                          )
                          .build();
            case 'contains':
                return Object.values(value).includes(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`Array object does not contain ${rule.value} value`)
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
                `${this.constructor.name} expected an Array object but received ${this.propertyValue}`
            );
        } else if (!Array.isArray(this.propertyValue)) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected an Array object but received ${typeof this.propertyValue}`
            );
        }
    }
}
