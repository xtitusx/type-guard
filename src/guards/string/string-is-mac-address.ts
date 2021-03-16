import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { MAC_ADDRESS_PATTERN } from '../../utils/pattern-constants';

export class StringIsMacAddress extends StringRuleChecker<{ type: 'isMacAddress' }> {
    constructor(rule: { type: 'isMacAddress' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(MAC_ADDRESS_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a MAC address but is not: ${this.value}`)
                  .build();
    }
}
