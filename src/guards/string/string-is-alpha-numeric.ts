import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { ALPHA_NUMERIC_PATTERN } from '../../utils/pattern-constants';

export class StringIsAlphaNumeric extends StringRuleChecker<{ type: 'isAlphaNumeric' }> {
    constructor(rule: { type: 'isAlphaNumeric' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(ALPHA_NUMERIC_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to only contain alphanumeric characters but does not: ${this.value}`)
                  .build();
    }
}
