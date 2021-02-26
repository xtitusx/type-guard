import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

/**
 * @class IsComposite
 */
export class IsComposite extends NumberRuleChecker<{ type: 'isComposite' }> {
    constructor(rule: { type: 'isComposite' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return NumberUtils.isComposite(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a composite number but is not: ${this.value}`)
                  .build();
    }
}
