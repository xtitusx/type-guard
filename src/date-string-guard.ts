import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { GuardResult } from './guard-result';
import { Guard } from './guard';

type DateStringRule = { type: 'isSameOrBefore'; value: string } | { type: 'isSameOrAfter'; value: string };

/** @class DateStringGuard
 * @extends {Guard<DAteStringRule>}
 */
export class DateStringGuard extends Guard<DateStringRule> {
    constructor(rules?: DateStringRule[]) {
        super(rules);
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une date est égale ou antérieure à une autre date.
     * @param value string
     */
    public isSameOrBefore(value: string): this {
        this.rules = this.addRule({ type: 'isSameOrBefore', value: value });
        return this;
    }

    /**
     * @summary Méthode chainable.
     * @description Règle qui vérifie si une date est égale ou postérieure à une autre date.
     * @param value string
     */
    public isSameOrAfter(value: string): this {
        this.rules = this.addRule({ type: 'isSameOrAfter', value: value });
        return this;
    }

    /**
     * @override
     * @param rule StringRule
     * @param value string
     */
    public checkRule(rule: DateStringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'isSameOrBefore':
                return dayjs(value).isSameOrBefore(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `dateString is expected to be the same or before ${rule.value} but is after ${value}`
                          )
                          .build();
            case 'isSameOrAfter':
                return dayjs(value).isSameOrAfter(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `dateString is expected to be the same or after ${rule.value} but is before ${value}`
                          )
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
                `${this.constructor.name} expected a string but received ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'string' || !dayjs(this.propertyValue).isValid()) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a dateString but received ${typeof this.propertyValue}`
            );
        }
    }
}
