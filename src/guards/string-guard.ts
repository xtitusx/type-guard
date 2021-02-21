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
    | { type: 'isAlphaNumeric' }
    | { type: 'isAlpha' }
    | { type: 'isNumeric' }
    | { type: 'isHex' }
    | { type: 'isObjectId' }
    | { type: 'isHexColor' };

/** @class StringGuard
 * @extends {Guard<StringRule>}
 */
export class StringGuard extends Guard<StringRule> {
    constructor(rules?: StringRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if two string are equals.
     * @param value string
     */
    public equals(value: string): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string contains the specified substring.
     * @param value string
     */
    public contains(value: string): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string matches the specified regex.
     * @param value RegExp
     */
    public matches(value: RegExp): this {
        this.addRule({ type: 'matches', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is empty (=== "").
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is not empty (!== "").
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string's length is equal to the specified number.
     * @param value number
     */
    public hasLength(value: number): this {
        this.addRule({ type: 'hasLength', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string's length is equal or greater than to the specified number.
     * @param min number
     */
    public hasMinLength(min: number): this {
        this.addRule({ type: 'hasMinLength', min: min });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string's length is equal or smaller than the specified number.
     * @param max number
     */
    public hasMaxLength(max: number): this {
        this.addRule({ type: 'hasMaxLength', max: max });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string contains only letters and numbers.
     */
    public isAlphaNumeric(): this {
        this.addRule({ type: 'isAlphaNumeric' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string contains only letters.
     */
    public isAlpha(): this {
        this.addRule({ type: 'isAlpha' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string contains only numbers.
     */
    public isNumeric(): this {
        this.addRule({ type: 'isNumeric' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a representation of a hexadecimal number.
     */
    public isHex(): this {
        this.addRule({ type: 'isHex' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a representation of an ObjectId (24 byte hex).
     * @example 507f1f77bcf86cd799439011, 507F1F77BCF86CD799439011
     */
    public isObjectId(): this {
        this.addRule({ type: 'isObjectId' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a representation of a hexadecimal color number.
     * @example #000000, #ffffff
     */
    public isHexColor(): this {
        this.addRule({ type: 'isHexColor' });
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
            case 'isAlphaNumeric':
                return value.match(/^[0-9a-zA-Z]+$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain alphanumeric characters but is not: ${value}`
                          )
                          .build();
            case 'isAlpha':
                return value.match(/^[a-zA-Z]+$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to only contain alpha characters but is not: ${value}`)
                          .build();
            case 'isNumeric':
                return value.match(/^[0-9]+$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to only contain numeric characters but is not: ${value}`)
                          .build();
            case 'isHex':
                return value.match(/^[a-f\d]+$/i) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a hexadecimal number but is not: ${value}`)
                          .build();
            case 'isObjectId':
                return value.match(/^[a-f\d]{24}$/i) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an ObjectId but is not: ${value}`)
                          .build();
            case 'isHexColor':
                return value.match(/^#[0-9A-F]{6}$/i) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a hexadecimal color number but is not: ${value}`)
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
