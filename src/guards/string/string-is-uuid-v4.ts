import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { UUIDV4_PATTERN } from '../../utils/pattern-constants';

export class StringIsUuidv4 extends StringRuleChecker<{ type: 'isUuidv4' }> {
    constructor(rule: { type: 'isUuidv4' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(UUIDV4_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an Uuid v4 but is not: ${this.value}`)
                  .build();
    }
}
