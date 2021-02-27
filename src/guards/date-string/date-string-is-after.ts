import dayjs from 'dayjs';

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class DateStringIsAfter extends DateStringRuleChecker<{ type: 'isAfter'; value: string }> {
    constructor(rule: { type: 'isAfter'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return dayjs(this.value).isAfter(this.rule.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`date string is expected to be after ${this.rule.value} but is before: ${this.value}`)
                  .build();
    }
}
