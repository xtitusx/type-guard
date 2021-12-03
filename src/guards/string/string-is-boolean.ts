import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * Boolean pattern.
 */
export const BOOLEAN_PATTERN = '^(true|false)$';

export class StringIsBoolean extends StringRuleChecker<{ type: 'isBoolean' }> {
    constructor(rule: { type: 'isBoolean' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isBoolean()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a boolean string but is not: ${this.value}`)
                  .build();
    }

    private isBoolean(): boolean {
        return this.value.match(new RegExp(BOOLEAN_PATTERN)) !== null;
    }
}
