import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { BINARY_PATTERN } from '../../utils/pattern-constants';

export class StringIsBinary extends StringRuleChecker<{ type: 'isBinary' }> {
    constructor(rule: { type: 'isBinary' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(BINARY_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a binary number but is not: ${this.value}`)
                  .build();
    }
}
