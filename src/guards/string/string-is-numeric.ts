import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NUMERIC_PATTERN } from '../../utils/pattern-constants';

export class StringIsNumeric extends StringRuleChecker<{ type: 'isNumeric' }> {
    constructor(rule: { type: 'isNumeric' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(NUMERIC_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to only contain numeric characters but does not: ${this.value}`)
                  .build();
    }
}
