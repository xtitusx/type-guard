import { DateStringRuleChecker } from './date-string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { Tyr } from '../../tyr';

/**
 * RFC3339 Datetime pattern.
 */
export const RFC3339_PATTERN =
    '^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])([Tt]|\\s)([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(.[0-9]+)?(([Zz])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$';

export class DateStringIsRfc3339 extends DateStringRuleChecker<{ type: 'isRfc3339' }> {
    constructor(rule: { type: 'isRfc3339' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isRfc3339Valid()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`date string is expected to be a valid RFC 3339 Datetime but is not: ${this.value}`)
                  .build();
    }

    private isRfc3339Valid(): boolean {
        return this.isRfc3339() && Tyr.dateString().isIso8601Date().guard(this.value.substring(0, 10)).isSuccess();
    }

    private isRfc3339(): boolean {
        return this.value.match(new RegExp(RFC3339_PATTERN)) !== null;
    }
}
