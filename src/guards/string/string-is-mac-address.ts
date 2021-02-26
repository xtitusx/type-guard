import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { MAC_ADDRESS_PATTERN } from '../../utils/pattern-constant';

/**
 * @class StringIsMACAddress
 */
export class StringIsMACAddress extends StringRuleChecker<{ type: 'isMACAddress' }> {
    constructor(rule: { type: 'isMACAddress' }, value: string) {
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
                  .withMessage(`string is expected to be a MAC Address but is not: ${this.value}`)
                  .build();
    }
}
