import { StringRule, EmailAddressDefinition } from './string/types';
import { Equals } from './string/equals';
import { NotEquals } from './string/not-equals';
import { Contains } from './string/contains';
import { NotContains } from './string/not-contains';
import { Matches } from './string/matches';
import { IsEmpty } from './string/is-empty';
import { IsNotEmpty } from './string/is-not-empty';
import { HasLength } from './string/has-length';
import { HasMinLength } from './string/has-min-length';
import { HasMaxLength } from './string/has-max-length';
import { IsUppercase } from './string/is-uppercase';
import { IsLowercase } from './string/is-lowercase';
import { IsAlphaNumeric } from './string/is-alpha-numeric';
import { IsAlpha } from './string/is-alpha';
import { IsNumeric } from './string/is-numeric';
import { IsEmailAddress } from './string/is-email-address';
import { IsHex } from './string/is-hex';
import { IsObjectId } from './string/is-object-id';
import { IsHexColor } from './string/is-hex-color';
import { IsUuidv4 } from './string/is-uuid-v4';
import { IsMACAddress } from './string/is-mac-address';
import { IsIPAddress } from './string/is-ip-address';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

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
     * Rule :
     * - Case sensitive.
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
     * Rule :
     * - Case sensitive.
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
     * @description Definition :
     * - quick : Common implementation matching 99% of all email addresses in actual use today.
     * - rfc5322 : Lightened RFC 5322 implementation matching 99.99%.
     *
     * Lightened RFC 5322 (sections 3.2.3 and 3.4.1) and RFC 5321 implementation is omitting :
     * - IP addresses.
     * - domain-specific addresses.
     * - the syntax using double quotes and square brackets.
     *
     * @see https://en.wikipedia.org/wiki/Email_address#Syntax, http://www.regular-expressions.info/email.html
     *  @param def 'quick' | 'rfc5322' (optional). Default is 'quick'.
     * @example `John.Doe@example.com`
     */
    public isEmailAddress(def?: EmailAddressDefinition): this {
        this.addRule({ type: 'isEmailAddress', def: def });
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
     * - Lowercase.
     * @see https://tools.ietf.org/html/rfc4122#section-3.
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
     * - IEEE802-types definition: dash separator, uppercase.
     * - IETF-yang-types definition: colon separator, lowercase.
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
                return new Equals(rule, value).exec();
            case 'notEquals':
                return new NotEquals(rule, value).exec();
            case 'contains':
                return new Contains(rule, value).exec();
            case 'notContains':
                return new NotContains(rule, value).exec();
            case 'matches':
                return new Matches(rule, value).exec();
            case 'isEmpty':
                return new IsEmpty(rule, value).exec();
            case 'isNotEmpty':
                return new IsNotEmpty(rule, value).exec();
            case 'hasLength':
                return new HasLength(rule, value).exec();
            case 'hasMinLength':
                return new HasMinLength(rule, value).exec();
            case 'hasMaxLength':
                return new HasMaxLength(rule, value).exec();
            case 'isUpperCase':
                return new IsUppercase(rule, value).exec();
            case 'isLowerCase':
                return new IsLowercase(rule, value).exec();
            case 'isAlphaNumeric':
                return new IsAlphaNumeric(rule, value).exec();
            case 'isAlpha':
                return new IsAlpha(rule, value).exec();
            case 'isNumeric':
                return new IsNumeric(rule, value).exec();
            case 'isEmailAddress':
                return new IsEmailAddress(rule, value).exec();
            case 'isHex':
                return new IsHex(rule, value).exec();
            case 'isObjectId':
                return new IsObjectId(rule, value).exec();
            case 'isHexColor':
                return new IsHexColor(rule, value).exec();
            case 'isUuidv4':
                return new IsUuidv4(rule, value).exec();
            case 'isMACAddress':
                return new IsMACAddress(rule, value).exec();
            case 'isIPAddress':
                return new IsIPAddress(rule, value).exec();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === undefined || this.propertyValue === null) {
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
