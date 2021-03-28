import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * Hex pattern:
 * - ECMAScript 2015 introduces HexIntegerLiteral, prefixed with 0x or 0X (not supported by old browsers).
 * - Not case sensitive.
 */
export const HEX_PATTERN = '^(0(x|X))?[a-fA-F\\d]+$';

export class StringIsHex extends StringRuleChecker<{ type: 'isHex' }> {
    constructor(rule: { type: 'isHex' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(HEX_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a hexadecimal number but is not: ${this.value}`)
                  .build();
    }
}
