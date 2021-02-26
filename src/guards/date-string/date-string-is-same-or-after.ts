import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class DateStringIsSameOrAfter
 */
export class DateStringIsSameOrAfter extends DateStringRuleChecker<{ type: 'isSameOrAfter'; value: string }> {
    constructor(rule: { type: 'isSameOrAfter'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return dayjs(this.value).isSameOrAfter(this.rule.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `date string is expected to be the same or after ${this.rule.value} but is before: ${this.value}`
                  )
                  .build();
    }
}
