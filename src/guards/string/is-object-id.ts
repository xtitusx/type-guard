import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { OBJECTID_PATTERN } from '../../utils/pattern-constant';

/**
 * @class IsObjectId
 */
export class IsObjectId extends StringRuleChecker<{ type: 'isObjectId' }> {
    constructor(rule: { type: 'isObjectId' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(OBJECTID_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an ObjectId but is not: ${this.value}`)
                  .build();
    }
}
