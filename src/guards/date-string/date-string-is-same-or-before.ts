import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class DateStringIsSameOrBefore extends DateStringRuleChecker<{ type: 'isSameOrBefore'; value: string }> {
    constructor(rule: { type: 'isSameOrBefore'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isSameOrBefore()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `date string is expected to be the same or before ${this.rule.value} but is after: ${this.value}`
                  )
                  .build();
    }

    private isSameOrBefore(): boolean {
        return dayjs(this.value).isSameOrBefore(this.rule.value);
    }
}
