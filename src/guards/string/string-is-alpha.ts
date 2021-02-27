import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { ALPHA_PATTERN } from '../../utils/pattern-constants';

export class StringIsAlpha extends StringRuleChecker<{ type: 'isAlpha' }> {
    constructor(rule: { type: 'isAlpha' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(ALPHA_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to only contain alpha characters but is not: ${this.value}`)
                  .build();
    }
}
