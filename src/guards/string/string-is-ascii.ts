import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * ASCII pattern:
 * - Matching all 95 ASCII printable characters.
 */
export const ASCII_PATTERN = '^[\x20-\x7E]+$';

export class StringIsAscii extends StringRuleChecker<{ type: 'isAscii' }> {
    constructor(rule: { type: 'isAscii' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isAscii()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to only contain ASCII characters but does not: ${this.value}`)
                  .build();
    }

    private isAscii(): boolean {
        return this.value.match(new RegExp(ASCII_PATTERN)) !== null;
    }
}
