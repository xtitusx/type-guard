import { StringRuleChecker } from './string-rule-checker';
import { TrimmedSide } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Leading whitespace pattern.
 */
export const LEADING_WHITESPACE_PATTERN = '^\\s';

/**
 * Trailing whitespace pattern.
 */
export const TRAILING_WHITESPACE_PATTERN = '\\s$';

export class StringIsTrimmed extends StringRuleChecker<{ type: 'isTrimmed'; side: TrimmedSide }> {
    constructor(rule: { type: 'isTrimmed'; side: TrimmedSide }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.side) {
            case 'both':
                return this.value.trim() === this.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not contain any leading and trailing whitespace but does: ${this.value}`
                          )
                          .build();
            case 'left':
                return this.value.match(new RegExp(LEADING_WHITESPACE_PATTERN)) === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not contain any leading whitespace but does: ${this.value}`
                          )
                          .build();
            case 'right':
                return this.value.match(new RegExp(TRAILING_WHITESPACE_PATTERN)) === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not contain any trailing whitespace but does: ${this.value}`
                          )
                          .build();
        }
    }
}
