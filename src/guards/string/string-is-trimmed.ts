import { StringRuleChecker } from './string-rule-checker';
import { TrimmedSide } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { LEADING_WHITESPACE_PATTERN } from '../../utils/pattern-constants';
import { TRAILING_WHITESPACE_PATTERN } from '../../utils/pattern-constants';

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
                              `string is expected to not contain any leading and trailing whitespace but has: ${this.value}`
                          )
                          .build();
            case 'left':
                return this.value.match(new RegExp(LEADING_WHITESPACE_PATTERN)) === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not contain any leading whitespace but has: ${this.value}`
                          )
                          .build();
            case 'right':
                return this.value.match(new RegExp(TRAILING_WHITESPACE_PATTERN)) === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to not contain any trailing whitespace but has: ${this.value}`
                          )
                          .build();
        }
    }
}
