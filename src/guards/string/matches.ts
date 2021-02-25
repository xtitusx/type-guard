import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class Matches
 */
export class Matches extends StringRuleChecker<{ type: 'matches'; value: RegExp }> {
    constructor(rule: { type: 'matches'; value: RegExp }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(this.rule.value) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to match ${this.rule.value} regex but does not: ${this.value}`)
                  .build();
    }
}
