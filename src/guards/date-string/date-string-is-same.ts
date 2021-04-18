import dayjs from 'dayjs';

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class DateStringIsSame extends DateStringRuleChecker<{ type: 'isSame'; value: string }> {
    constructor(rule: { type: 'isSame'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return dayjs(this.value).isSame(this.rule.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `date string is expected to be the same that ${this.rule.value} but is different: ${this.value}`
                  )
                  .build();
    }

    private isSame(): boolean {
        return dayjs(this.value).isSame(this.rule.value);
    }
}
