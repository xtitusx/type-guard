import { Guard } from './guard';
import { GuardResult } from '../guard-result';

type StringRule =
    | { type: 'equals'; value: string }
    | { type: 'contains'; value: string }
    | { type: 'matches'; value: RegExp }
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasLength'; value: number }
    | { type: 'hasMinLength'; min: number }
    | { type: 'hasMaxLength'; max: number }
    | { type: 'isAlphaNum' }
    | { type: 'isNumeric' }
    | { type: 'isObjectId' };

/** @class StringGuard
 * @extends {Guard<StringRule>}
 */
export class StringGuard extends Guard<StringRule> {
    constructor(rules?: StringRule[]) {
        super(rules);
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie une égalité de chaînes de caractères.
     * @param value string
     */
    public equals(value: string): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères contient une sous-chaîne de caractères.
     * @param value string
     */
    public contains(value: string): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères correspond à la description donnée par l'expression régulière.
     * @param value RegExp
     */
    public matches(value: RegExp): this {
        this.addRule({ type: 'matches', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères est vide ("").
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères n'est pas vide.
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la longueur exacte d'une chaîne de caractères.
     * @param value number
     */
    public hasLength(value: number): this {
        this.addRule({ type: 'hasLength', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la longueur minimale d'une chaîne de caractères.
     * @param min number
     */
    public hasMinLength(min: number): this {
        this.addRule({ type: 'hasMinLength', min: min });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie la longueur maximale d'une chaîne de caractères.
     * @param max number
     */
    public hasMaxLength(max: number): this {
        this.addRule({ type: 'hasMaxLength', max: max });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères ne contient que des caractères alphanumériques.
     */
    public isAlphaNum(): this {
        this.addRule({ type: 'isAlphaNum' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères ne contient que des caractères numériques.
     */
    public isNumeric(): this {
        this.addRule({ type: 'isNumeric' });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une chaîne de caractères est au format ObjectId.
     * @param max number
     */
    public isObjectId(): this {
        this.addRule({ type: 'isObjectId' });
        return this;
    }

    /**
     * @override
     * @param rule StringRule
     * @param value string
     */
    public checkRule(rule: StringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be ${rule.value} but is not: ${value}`)
                          .build();
            case 'contains':
                return value.indexOf(rule.value) !== -1
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to contain ${rule.value} but is not: ${value}`)
                          .build();
            case 'matches':
                return value.match(rule.value) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to match ${rule.value} regex but is not: ${value}`)
                          .build();
            case 'isEmpty':
                return value.length === 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be empty but has length of: ${value.length}`)
                          .build();
            case 'isNotEmpty':
                return value.length !== 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to not be empty but has length of: ${value.length}`)
                          .build();
            case 'hasLength':
                return value.length === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to have length of ${rule.value} but has length of: ${value.length}`
                          )
                          .build();
            case 'hasMinLength':
                return value.length >= rule.min
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to have min length of ${rule.min} but has length of: ${value.length}`
                          )
                          .build();
            case 'hasMaxLength':
                return value.length <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to have max length of ${rule.max} but has length of: ${value.length}`
                          )
                          .build();
            case 'isAlphaNum':
                return value.match(/^[0-9a-zA-Z]+$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain alphanumeric characters but is not: ${value}`
                          )
                          .build();
            case 'isNumeric':
                return value.match(/^[0-9]+$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to only contain numeric characters but is not: ${value}`)
                          .build();
            case 'isObjectId':
                return value.match(/^[a-f\d]{24}$/i) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an ObjectId but is not: ${value}`)
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
                `${this.constructor.name} expected a string but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'string') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a string but received: ${typeof this.propertyValue}`
            );
        }
    }
}
