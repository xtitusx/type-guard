import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

export class NumberHasMaxFractionDigits extends NumberRuleChecker<{
    type: 'hasMaxFractionDigits';
    max: number;
}> {
    constructor(
        rule: {
            type: 'hasMaxFractionDigits';
            max: number;
        },
        value: number
    ) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return NumberUtils.getPrecision(this.value) <= this.rule.max
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to have a max of ${this.rule.max} fraction digits but has not: ${this.value}`
                  )
                  .build();
    }
}
