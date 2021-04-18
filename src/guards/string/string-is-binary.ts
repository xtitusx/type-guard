import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * Binary pattern:
 * - ECMAScript 2015 introduces BinaryIntegerLiteral, prefixed with 0b or 0B (not supported by old browsers).
 */
export const BINARY_PATTERN = '^(0(b|B))?[0-1]+$';

export class StringIsBinary extends StringRuleChecker<{ type: 'isBinary' }> {
    constructor(rule: { type: 'isBinary' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isBinary()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a binary number but is not: ${this.value}`)
                  .build();
    }

    private isBinary(): boolean {
        return this.value.match(new RegExp(BINARY_PATTERN)) !== null;
    }
}
