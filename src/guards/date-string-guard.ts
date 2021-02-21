import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { Guard } from './guard';

import { GuardResult } from '../guard-result';

type DateStringRule =
    | { type: 'isSame'; value: string }
    | { type: 'isSameOrBefore'; value: string }
    | { type: 'isSameOrAfter'; value: string }
    | { type: 'isBefore'; value: string }
    | { type: 'isAfter'; value: string };

/** @class DateStringGuard
 * @extends {Guard<DateStringRule>}
 */
export class DateStringGuard extends Guard<DateStringRule> {
    constructor(rules?: DateStringRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if a string representation of a date is the same that the specified date.
     * @param value string
     */
    public isSame(value: string): this {
        this.addRule({ type: 'isSame', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if a string representation of a date is the same or before the specified date.
     * @param value string
     */
    public isSameOrBefore(value: string): this {
        this.addRule({ type: 'isSameOrBefore', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if a string representation of a date is the same or after the specified date.
     * @param value string
     */
    public isSameOrAfter(value: string): this {
        this.addRule({ type: 'isSameOrAfter', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if a string representation of a date is strictly before the specified date.
     * @param value string
     */
    public isBefore(value: string): this {
        this.addRule({ type: 'isBefore', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if a string representation of a date is strictly after the specified date.
     * @param value string
     */
    public isAfter(value: string): this {
        this.addRule({ type: 'isAfter', value: value });
        return this;
    }

    /**
     * @override
     * @param rule DateStringRule
     * @param value string
     */
    public checkRule(rule: DateStringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'isSame':
                return dayjs(value).isSame(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `dateString is expected to be the same that ${rule.value} but is different: ${value}`
                          )
                          .build();
            case 'isSameOrBefore':
                return dayjs(value).isSameOrBefore(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `dateString is expected to be the same or before ${rule.value} but is after: ${value}`
                          )
                          .build();
            case 'isSameOrAfter':
                return dayjs(value).isSameOrAfter(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `dateString is expected to be the same or after ${rule.value} but is before: ${value}`
                          )
                          .build();
            case 'isBefore':
                return dayjs(value).isBefore(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`dateString is expected to be before ${rule.value} but is after: ${value}`)
                          .build();
            case 'isAfter':
                return dayjs(value).isAfter(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`dateString is expected to be after ${rule.value} but is before: ${value}`)
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
        } else if (typeof this.propertyValue !== 'string' || !dayjs(this.propertyValue).isValid()) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a dateString but received: ${typeof this.propertyValue}`
            );
        }
    }
}
