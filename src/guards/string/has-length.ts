import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class HasLength
 */
export class HasLength extends StringRuleChecker<{ type: 'hasLength'; value: number }> {
    constructor(rule: { type: 'hasLength'; value: number }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length === this.rule.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to have length of ${this.rule.value} but has length of: ${this.value.length}`
                  )
                  .build();
    }
}
