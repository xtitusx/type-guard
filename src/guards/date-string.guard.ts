import dayjs from 'dayjs';

import { DateStringRule } from './date-string/date-string-types';
import { DateStringIsIso8601Date } from './date-string/date-string-is-iso-8601-date';
import { DateStringIsRfc3339 } from './date-string/date-string-is-rfc-3339';
import { DateStringIsSame } from './date-string/date-string-is-same';
import { DateStringIsSameOrBefore } from './date-string/date-string-is-same-or-before';
import { DateStringIsSameOrAfter } from './date-string/date-string-is-same-or-after';
import { DateStringIsBefore } from './date-string/date-string-is-before';
import { DateStringIsAfter } from './date-string/date-string-is-after';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class DateStringGuard extends Guard<DateStringRule> {
    constructor(rules?: DateStringRule[]) {
        super(rules);
    }

    /**
     * Checks if date string is a valid and existing ISO 8601 Date (YYYY-MM-DD).
     * @remarks Chainable method.
     * @see {@link https://en.wikipedia.org/wiki/ISO_8601}
     * @example 1982-03-16
     */
    public isIso8601Date(): this {
        this.addRule({ type: 'isIso8601Date' });
        return this;
    }

    /**
     * Checks if date string is a valid and existing RFC 3339 Datetime.
     *
     * RFC 3339 is following the ISO 8601 DateTime format. The only difference is RFC allows us to replace “T” with “space”.
     * @remarks Chainable method.
     * @see {@link https://medium.com/easyread/understanding-about-rfc-3339-for-datetime-formatting-in-software-engineering-940aa5d5f68a}
     * @example 2019-10-12T07:20:50.52Z, 2019-10-12 07:20:50.52Z
     */
    public isRfc3339(): this {
        this.addRule({ type: 'isRfc3339' });
        return this;
    }

    /**
     * Checks if date string is the same that the specified date.
     * @remarks Chainable method.
     * @param value
     */
    public isSame(value: string): this {
        this.addRule({ type: 'isSame', value: value });
        return this;
    }

    /**
     * Checks if date string is the same or before the specified date.
     * @remarks Chainable method.
     * @param value
     */
    public isSameOrBefore(value: string): this {
        this.addRule({ type: 'isSameOrBefore', value: value });
        return this;
    }

    /**
     * Checks if date string is the same or after the specified date.
     * @remarks Chainable method.
     * @param value
     */
    public isSameOrAfter(value: string): this {
        this.addRule({ type: 'isSameOrAfter', value: value });
        return this;
    }

    /**
     * Checks if date string is strictly before the specified date.
     * @remarks Chainable method.
     * @param value
     */
    public isBefore(value: string): this {
        this.addRule({ type: 'isBefore', value: value });
        return this;
    }

    /**
     * Checks if date string is strictly after the specified date.
     * @remarks Chainable method.
     * @param value
     */
    public isAfter(value: string): this {
        this.addRule({ type: 'isAfter', value: value });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
     */
    protected checkRule(rule: DateStringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'isIso8601Date':
                return new DateStringIsIso8601Date(rule, value).exec();
            case 'isRfc3339':
                return new DateStringIsRfc3339(rule, value).exec();
            case 'isSame':
                return new DateStringIsSame(rule, value).exec();
            case 'isSameOrBefore':
                return new DateStringIsSameOrBefore(rule, value).exec();
            case 'isSameOrAfter':
                return new DateStringIsSameOrAfter(rule, value).exec();
            case 'isBefore':
                return new DateStringIsBefore(rule, value).exec();
            case 'isAfter':
                return new DateStringIsAfter(rule, value).exec();
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
        } else if (typeof this.propertyValue !== 'string' || !dayjs(this.propertyValue).isValid()) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a date string but received: ${typeof this.propertyValue}`
            );
        }
    }
}
