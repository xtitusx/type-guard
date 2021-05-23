import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * AlphaNumeric pattern:
 * - Only basic-latin characters and/or numbers.
 * - Not case sensitive.
 */
export const ALPHA_NUMERIC_PATTERN = '^[0-9a-zA-Z]+$';

export class StringIsAlphaNumeric extends StringRuleChecker<{ type: 'isAlphaNumeric' }> {
    constructor(rule: { type: 'isAlphaNumeric' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isAlphaNumeric()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to only contain alphanumeric characters but does not: ${this.value}`)
                  .build();
    }

    private isAlphaNumeric(): boolean {
        return this.value.match(new RegExp(ALPHA_NUMERIC_PATTERN)) !== null;
    }
}
