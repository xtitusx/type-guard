import {
    StringRule,
    CapitalizationStyle,
    EmailAddressDefinition,
    TrimmedSide,
    ProgrammingConvention,
} from './string/string-types';
import { IIsDecimalOptions } from './string/string-options';
import { StringEquals } from './string/string-equals';
import { StringNotEquals } from './string/string-not-equals';
import { StringContains } from './string/string-contains';
import { StringNotContains } from './string/string-not-contains';
import { StringMatches } from './string/string-matches';
import { StringIsEmpty } from './string/string-is-empty';
import { StringIsNotEmpty } from './string/string-is-not-empty';
import { StringHasLength } from './string/string-has-length';
import { StringHasMinLength } from './string/string-has-min-length';
import { StringHasMaxLength } from './string/string-has-max-length';
import { StringIsUppercase } from './string/string-is-uppercase';
import { StringIsLowercase } from './string/string-is-lowercase';
import { StringIsCapitalized } from './string/string-is-capitalized';
import { StringIsProgrammingCase } from './string/string-is-programming-case';
import { StringIsTrimmed } from './string/string-is-trimmed';
import { StringIsAlphaNumeric } from './string/string-is-alpha-numeric';
import { StringIsAlpha } from './string/string-is-alpha';
import { StringIsNumeric } from './string/string-is-numeric';
import { StringIsHex } from './string/string-is-hex';
import { StringIsDecimal } from './string/string-is-decimal';
import { StringIsEmailAddress } from './string/string-is-email-address';
import { StringIsObjectId } from './string/string-is-object-id';
import { StringIsHexColor } from './string/string-is-hex-color';
import { StringIsUuidv4 } from './string/string-is-uuid-v4';
import { StringIsMACAddress } from './string/string-is-mac-address';
import { StringIsIPAddress } from './string/string-is-ip-address';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class StringGuard extends Guard<StringRule> {
    constructor(rules?: StringRule[]) {
        super(rules);
    }

    /**
     * Checks if two string are equals.
     * @remarks Chainable method.
     * @param value
     */
    public equals(value: string): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * Checks if two string are not equals.
     * @remarks Chainable method.
     * @param value
     */
    public notEquals(value: string): this {
        this.addRule({ type: 'notEquals', value: value });
        return this;
    }

    /**
     * Checks if string contains the specified substring.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Case sensitive.
     * ```
     * @param value
     */
    public contains(value: string): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * Checks if string does not contain the specified substring.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Case sensitive.
     * ```
     * @param value
     */
    public notContains(value: string): this {
        this.addRule({ type: 'notContains', value: value });
        return this;
    }

    /**
     * Checks if string matches the specified regex.
     * @remarks Chainable method.
     * @param value
     */
    public matches(value: RegExp): this {
        this.addRule({ type: 'matches', value: value });
        return this;
    }

    /**
     * Checks if string is empty.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Equals "".
     * ```
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * Checks if string is not empty.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Not equals "".
     * ```
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * Checks if string's length is equal to the specified number.
     * @remarks Chainable method.
     * @param value
     */
    public hasLength(value: number): this {
        this.addRule({ type: 'hasLength', value: value });
        return this;
    }

    /**
     * Checks if string's length is equal or greater than to the specified number.
     * @remarks Chainable method.
     * @param min
     */
    public hasMinLength(min: number): this {
        this.addRule({ type: 'hasMinLength', min: min });
        return this;
    }

    /**
     * Checks if string's length is equal or smaller than the specified number.
     * @remarks Chainable method.
     * @param max
     */
    public hasMaxLength(max: number): this {
        this.addRule({ type: 'hasMaxLength', max: max });
        return this;
    }

    /**
     * Checks if string does not contain any lowercase alpha characters.
     * @remarks Chainable method.
     */
    public isUpperCase(): this {
        this.addRule({ type: 'isUpperCase' });
        return this;
    }

    /**
     * Checks if string does not contain any uppercase alpha characters.
     * @remarks Chainable method.
     */
    public isLowerCase(): this {
        this.addRule({ type: 'isLowerCase' });
        return this;
    }

    /**
     * Checks if string follows capitalization style.
     * @remarks Chainable method.
     * @param style - 'firstChar' | 'startCase'
     * ```ts
     * style:
     * - firstChar: Only the first character is capitalized.
     * - startCase: All words, including articles, prepositions, and conjunctions, start with a capitalized character.
     *
     * Rule:
     * - Word divider is whitespace.
     * ```
     * @param checkFirstCharIsLetter - Strict or permissive style. Default is true (strict).
     * ```ts
     * true:
     * - in 'firstChar' style, the first encountered character is mandatorily a letter.
     * - in 'startCase' style, the first character of each encountered word is mandatorily a letter.
     *
     * false:
     * - in 'firstChar' style, the first encountered character can be either alphanumeric or special (even whitespace).
     * - in 'startCase' style, the first character of each encountered word can be either alphanumeric or special.
     * ```
     * @returns
     * ```ts
     * - true with ('firstChar', true) params for values: "Foo", "F", "Foo#", "", "Thirty eight is my age"
     * - false with ('firstChar', true) params for values: " Foo", "#foo"
     * - true with ('firstChar', false) params for values: "Foo", "F", "#foo", "     foo", "", "38 is my age"
     * - false with ('firstChar', false) params for values: "foo", "f", "#Foo", "     Foo", "38 is my Age"
     *
     * - true with ('startCase', true) params for values: "The Quick Brown Fox Jumps Over The Lazy Dog.", " Foo, Bar."
     * - false with ('startCase', true) params for value: "1 Quick Brown Fox Jumps Over The Lazy Dog."
     * - true with ('startCase', false) params for value: "1 Quick Brown Fox Jumps Over The Lazy Dog."
     * - false with ('startCase', false) params for value: "1 quick Brown Fox Jumps Over The Lazy Dog."
     * ```
     */
    public isCapitalized(style: CapitalizationStyle, checkFirstCharIsLetter?: boolean): this {
        this.addRule({ type: 'isCapitalized', style, checkFirstCharIsLetter });
        return this;
    }

    /**
     *
     * @param convention - Most popular programming naming conventions.
     */
    public isProgrammingCase(convention: ProgrammingConvention): this {
        this.addRule({ type: 'isProgrammingCase', convention });
        return this;
    }

    /**
     * Checks if string does not contain any leading and trailing whitespace.
     * @remarks Chainable method.
     * @param side - 'both' | 'left' | 'right'
     */
    public isTrimmed(side: TrimmedSide): this {
        this.addRule({ type: 'isTrimmed', side });
        return this;
    }

    /**
     * Checks if string only contains alpha characters and/or numbers.
     * @remarks Chainable method.
     */
    public isAlphaNumeric(): this {
        this.addRule({ type: 'isAlphaNumeric' });
        return this;
    }

    /**
     * Checks if string only contains alpha characters.
     * @remarks Chainable method.
     */
    public isAlpha(): this {
        this.addRule({ type: 'isAlpha' });
        return this;
    }

    /**
     * Checks if string only contains numbers.
     * @remarks Chainable method.
     */
    public isNumeric(): this {
        this.addRule({ type: 'isNumeric' });
        return this;
    }

    /**
     * Checks if string is a hexadecimal number.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Not case sensitive.
     * ```
     * @example F061A, f061a
     */
    public isHex(): this {
        this.addRule({ type: 'isHex' });
        return this;
    }

    /**
     * Checks if string is a decimal number.
     * @remarks Chainable method.
     * @param options - Additional options.
     * ```ts
     * options:
     * - force: Force number to have a decimal separator. Default is false.
     * - precision: Max number of digits to the right of the decimal point in the number.
     *
     * Rules:
     * Supported decimal separators:
     * - Point.
     * - Comma.
     * ```
     */
    public isDecimal(options?: IIsDecimalOptions): this {
        this.addRule({ type: 'isDecimal', options });
        return this;
    }

    /**
     * Checks if string is an email address number.
     * @remarks Chainable method.
     * @param def - 'quick' | 'rfc5322'. Default is 'quick'.
     * ```ts
     * def:
     * - quick : Common implementation matching 99% of all email addresses in actual use today.
     * - rfc5322 : Lightened RFC 5322 implementation matching 99.99%.
     *
     * Rules:
     * Lightened RFC 5322 (sections 3.2.3 and 3.4.1) and RFC 5321 implementation is omitting :
     * - IP addresses.
     * - domain-specific addresses.
     * - the syntax using double quotes and square brackets.
     * ```
     * @see {@link https://en.wikipedia.org/wiki/Email_address#Syntax} for syntax.
     * @see {@link http://www.regular-expressions.info/email.html} for regex details.
     
     * @example `John.Doe@example.com`
     */
    public isEmailAddress(def?: EmailAddressDefinition): this {
        this.addRule({ type: 'isEmailAddress', def: def });
        return this;
    }

    /**
     * Checks if string is a representation of a MongoDB ObjectId.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - 24 hex digits.
     * - Not case sensitive.
     * ```
     * @example 507f1f77bcf86cd799439011, 507F1F77BCF86CD799439011
     */
    public isObjectId(): this {
        this.addRule({ type: 'isObjectId' });
        return this;
    }

    /**
     * Checks if string is a hexadecimal color.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - Starts with hastag (#) and is followed by 3 or 6 digits.
     * - Not case sensitive.
     * ```
     * @param digits
     * @example #000000, #FFFFFF, #000, #fff
     */
    public isHexColor(digits?: 3 | 6): this {
        this.addRule({ type: 'isHexColor', digits: digits });
        return this;
    }

    /**
     * Checks if string is an Universally unique identifier v4.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Lowercase.
     * ```
     * @see {@link https://tools.ietf.org/html/rfc4122#section-3} for syntax.
     * @example 9ad086df-061d-490c-8224-7e8ac292eeaf
     */
    public isUuidv4(): this {
        this.addRule({ type: 'isUuidv4' });
        return this;
    }

    /**
     * Checks if string is a MAC address.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - 12 hex degits (6 groups of 2 digits).
     * - IEEE802-types definition: dash separator, uppercase.
     * - IETF-yang-types definition: colon separator, lowercase.
     * ```
     * @see {@link https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf} for syntax.
     * @example 00-0A-95-9D-68-16, 00:0a:95:9d:68:16
     */
    public isMACAddress(): this {
        this.addRule({ type: 'isMACAddress' });
        return this;
    }

    /**
     * Checks if string is an IP address.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     *
     * IP address v6 pattern matching:
     *  - IPv6 addresses.
     *  - Zero compressed IPv6 addresses (section 2.2 of rfc5952).
     *  - Link-local IPv6 addresses with zone index (section 11 of rfc4007).
     *  - IPv4-Embedded IPv6 address (section 2 of rfc6052).
     *  - IPv4-mapped IPv6 addresses (section 2.1 of rfc2765).
     *  - IPv4-translated addresses (section 2.1 of rfc2765).
     * ```
     * @param version
     * @example 192.168.0.1, fde5:a773:d01a:0b6d
     */
    public isIPAddress(version?: 4 | 6): this {
        this.addRule({ type: 'isIPAddress', version: version });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
     */
    protected checkRule(rule: StringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'equals':
                return new StringEquals(rule, value).exec();
            case 'notEquals':
                return new StringNotEquals(rule, value).exec();
            case 'contains':
                return new StringContains(rule, value).exec();
            case 'notContains':
                return new StringNotContains(rule, value).exec();
            case 'matches':
                return new StringMatches(rule, value).exec();
            case 'isEmpty':
                return new StringIsEmpty(rule, value).exec();
            case 'isNotEmpty':
                return new StringIsNotEmpty(rule, value).exec();
            case 'hasLength':
                return new StringHasLength(rule, value).exec();
            case 'hasMinLength':
                return new StringHasMinLength(rule, value).exec();
            case 'hasMaxLength':
                return new StringHasMaxLength(rule, value).exec();
            case 'isUpperCase':
                return new StringIsUppercase(rule, value).exec();
            case 'isLowerCase':
                return new StringIsLowercase(rule, value).exec();
            case 'isCapitalized':
                return new StringIsCapitalized(rule, value).exec();
            case 'isProgrammingCase':
                return new StringIsProgrammingCase(rule, value).exec();
            case 'isTrimmed':
                return new StringIsTrimmed(rule, value).exec();
            case 'isAlphaNumeric':
                return new StringIsAlphaNumeric(rule, value).exec();
            case 'isAlpha':
                return new StringIsAlpha(rule, value).exec();
            case 'isNumeric':
                return new StringIsNumeric(rule, value).exec();
            case 'isHex':
                return new StringIsHex(rule, value).exec();
            case 'isDecimal':
                return new StringIsDecimal(rule, value).exec();
            case 'isEmailAddress':
                return new StringIsEmailAddress(rule, value).exec();
            case 'isObjectId':
                return new StringIsObjectId(rule, value).exec();
            case 'isHexColor':
                return new StringIsHexColor(rule, value).exec();
            case 'isUuidv4':
                return new StringIsUuidv4(rule, value).exec();
            case 'isMACAddress':
                return new StringIsMACAddress(rule, value).exec();
            case 'isIPAddress':
                return new StringIsIPAddress(rule, value).exec();
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
