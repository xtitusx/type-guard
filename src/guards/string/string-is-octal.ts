import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { OCTAL_PATTERN } from '../../utils/pattern-constants';

export class StringIsOctal extends StringRuleChecker<{ type: 'isOctal' }> {
    constructor(rule: { type: 'isOctal' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(OCTAL_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an octal number but is not: ${this.value}`)
                  .build();
    }
}
