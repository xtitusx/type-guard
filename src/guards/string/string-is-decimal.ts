import { StringRuleChecker } from './string-rule-checker';
import { IIsDecimalOptions } from './string-options';

import { GuardResult } from '../../core/guard-result';
import { DECIMAL_PATTERN } from '../../utils/pattern-constants';

export class StringIsDecimal extends StringRuleChecker<{ type: 'isDecimal'; options?: IIsDecimalOptions }> {
    constructor(rule: { type: 'isDecimal'; options?: IIsDecimalOptions }, value: string) {
        super(rule, value);
    }

    public exec(): GuardResult {
        return this.value.match(new RegExp(DECIMAL_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a decimal number but is not: ${this.value}`)
                  .build();
    }
}
