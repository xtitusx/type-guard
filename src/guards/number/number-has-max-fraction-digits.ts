import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

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
        return this.hasMaxFractionDigits()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to have a max of ${this.rule.max} fraction digits but has not: ${this.value}`
                  )
                  .build();
    }

    private hasMaxFractionDigits(): boolean {
        return this.getPrecision() <= this.rule.max;
    }

    /**
     * Returns the number of digits to the right of the decimal point in the number.
     */
    private getPrecision(): number {
        if (!isFinite(this.value)) {
            return 0;
        }
        let e = 1,
            precision = 0;
        while (Math.round(this.value * e) / e !== this.value) {
            e *= 10;
            precision++;
        }
        return precision;
    }
}
