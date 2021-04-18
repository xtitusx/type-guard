import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * ISO8601 date pattern (YYYY-MM-DD).
 */
export const ISO8601_DATE_PATTERN = '^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$';

export class DateStringIsIso8601Date extends DateStringRuleChecker<{ type: 'isIso8601Date' }> {
    constructor(rule: { type: 'isIso8601Date' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIso8601DateValid()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`date string is expected to be a valid Iso 8601 date but is not: ${this.value}`)
                  .build();
    }

    private isIso8601DateValid(): boolean {
        return dayjs(this.value, 'YYYY-MM-DD').format('YYYY-MM-DD') === this.value;
    }

    private isIso8601Date(): boolean {
        return this.value.match(new RegExp(ISO8601_DATE_PATTERN)) !== null;
    }
}
