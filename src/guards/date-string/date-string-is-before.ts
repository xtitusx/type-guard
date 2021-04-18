import dayjs from 'dayjs';

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class DateStringIsBefore extends DateStringRuleChecker<{ type: 'isBefore'; value: string }> {
    constructor(rule: { type: 'isBefore'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isBefore()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`date string is expected to be before ${this.rule.value} but is after: ${this.value}`)
                  .build();
    }

    private isBefore(): boolean {
        return dayjs(this.value).isBefore(this.rule.value);
    }
}
