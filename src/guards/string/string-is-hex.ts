import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { HEX_PATTERN } from '../../utils/pattern-constant';

/**
 * @class StringIsHex
 */
export class StringIsHex extends StringRuleChecker<{ type: 'isHex' }> {
    constructor(rule: { type: 'isHex' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(HEX_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a hexadecimal number but is not: ${this.value}`)
                  .build();
    }
}
