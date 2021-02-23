import { Guard } from './guard';

import { GuardResult } from '../guard-result';

type StringRule =
    | { type: 'equals'; value: string }
    | { type: 'notEquals'; value: string }
    | { type: 'contains'; value: string }
    | { type: 'notContains'; value: string }
    | { type: 'matches'; value: RegExp }
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasLength'; value: number }
    | { type: 'hasMinLength'; min: number }
    | { type: 'hasMaxLength'; max: number }
    | { type: 'isUpperCase' }
    | { type: 'isLowerCase' }
    | { type: 'isAlphaNumeric' }
    | { type: 'isAlpha' }
    | { type: 'isNumeric' }
    | { type: 'isHex' }
    | { type: 'isObjectId' }
    | { type: 'isHexColor'; digits?: 3 | 6 }
    | { type: 'isUuidv4' }
    | { type: 'isMACAddress' }
    | { type: 'isIPAddress' };

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
     * @description Checks if two string are not equals.
     * @param value string
     */
    public notEquals(value: string): this {
        this.addRule({ type: 'notEquals', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string contains the specified substring.
     *
     * Rules :
     * - case sensitive.
     * @param value string
     */
    public contains(value: string): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string does not contain the specified substring.
     *
     * Rules :
     * - case sensitive.
     * @param value string
     */
    public notContains(value: string): this {
        this.addRule({ type: 'notContains', value: value });
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
     * @description Checks if string is empty.
     *
     * Rule :
     * - Equals "".
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is not empty.
     *
     * Rule :
     * - Not equals "".
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
     * @description Checks if string does not contain any lowercase alpha characters.
     */
    public isUpperCase(): this {
        this.addRule({ type: 'isUpperCase' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string does not contain any uppercase alpha characters.
     */
    public isLowerCase(): this {
        this.addRule({ type: 'isLowerCase' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string only contains alpha characters and/or numbers.
     */
    public isAlphaNumeric(): this {
        this.addRule({ type: 'isAlphaNumeric' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string only contains alpha characters.
     */
    public isAlpha(): this {
        this.addRule({ type: 'isAlpha' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string only contains numbers.
     */
    public isNumeric(): this {
        this.addRule({ type: 'isNumeric' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a hexadecimal number.
     *
     * Rule :
     * - Not case sensitive.
      @example F061A, f061a
     */
    public isHex(): this {
        this.addRule({ type: 'isHex' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a representation of a MongoDB ObjectId.
     *
     * Rules :
     * - 24 hex digits.
     * - Not case sensitive.
     * @example 507f1f77bcf86cd799439011, 507F1F77BCF86CD799439011
     */
    public isObjectId(): this {
        this.addRule({ type: 'isObjectId' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a hexadecimal color.
     *
     * Rules :
     * - Starts with hastag (#) and is followed by 3 or 6 digits.
     * - Not case sensitive.
     * @param digits 3 | 6 (optional).
     * @example #000000, #FFFFFF, #000, #fff
     */
    public isHexColor(digits?: 3 | 6): this {
        this.addRule({ type: 'isHexColor', digits: digits });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is an Universally unique identifier v4.
     *
     * Rule :
     * - Case sensitive: https://tools.ietf.org/html/rfc4122#section-3.
     * @example 9ad086df-061d-490c-8224-7e8ac292eeaf
     */
    public isUuidv4(): this {
        this.addRule({ type: 'isUuidv4' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if string is a MAC Address.
     *
     * Rules :
     * - 12 hex degits (6 groups of 2 digits).
     * - ieee802-types definition: dash separator, uppercase.
     * - ietf-yang-types definition: colon separator, lowercase.
     * @see https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf
     * @example 00-0A-95-9D-68-16, 00:0a:95:9d:68:16
     */
    public isMACAddress(): this {
        this.addRule({ type: 'isMACAddress' });
        return this;
    }

    /**
     * @override
     * @param rule StringRule
     * @param value string
     */
    protected checkRule(rule: StringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be ${rule.value} but is not: ${value}`)
                          .build();
            case 'notEquals':
                return value !== rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is not expected to be ${rule.value} but is: ${value}`)
                          .build();
            case 'contains':
                return value.indexOf(rule.value) !== -1
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to contain ${rule.value} but does not: ${value}`)
                          .build();
            case 'notContains':
                return value.indexOf(rule.value) === -1
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is not expected to contain ${rule.value} but does: ${value}`)
                          .build();
            case 'matches':
                return value.match(rule.value) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to match ${rule.value} regex but does not: ${value}`)
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
            case 'isUpperCase':
                return value.toUpperCase() === value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not have lowercase alpha characters but has: ${value.length}`
                          )
                          .build();
            case 'isLowerCase':
                return value.toLowerCase() === value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not have uppercase alpha characters but has: ${value.length}`
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
                switch (rule.digits) {
                    case 3:
                        return value.match(/^#[0-9A-F]{3}$/i) !== null
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `string is expected to be a 3 digits hexadecimal color but is not: ${value}`
                                  )
                                  .build();
                    case 6:
                        return value.match(/^#[0-9A-F]{6}$/i) !== null
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `string is expected to be a 6 digits hexadecimal color but is not: ${value}`
                                  )
                                  .build();
                    default:
                        return value.match(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i) !== null
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(`string is expected to be a hexadecimal color but is not: ${value}`)
                                  .build();
                }
            case 'isUuidv4':
                return value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an Uuid v4 but is not: ${value}`)
                          .build();
            case 'isMACAddress':
                return value.match(/^((([0-9A-F]{2}-){5})|(([0-9a-f]{2}:){5}))[0-9a-f]{2}$/) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a MAC Address but is not: ${value}`)
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
