import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class HasMaxLength
 */
export class HasMaxLength extends StringRuleChecker<{ type: 'hasMaxLength'; max: number }> {
    constructor(rule: { type: 'hasMaxLength'; max: number }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length <= this.rule.max
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to have max length of ${this.rule.max} but has length of: ${this.value.length}`
                  )
                  .build();
    }
}
