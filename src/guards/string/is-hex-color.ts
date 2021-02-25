import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { SIX_DIGITS_HEX_COLOR_PATTERN, THREE_DIGITS_HEX_COLOR_PATTERN } from '../../utils/pattern-constant';

/**
 * @class IsHexColor
 */
export class IsHexColor extends StringRuleChecker<{ type: 'isHexColor'; digits?: 3 | 6 }> {
    constructor(rule: { type: 'isHexColor'; digits?: 3 | 6 }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.digits) {
            case 3:
                return this.value.match(new RegExp(THREE_DIGITS_HEX_COLOR_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a 3 digits hexadecimal color but is not: ${this.value}`
                          )
                          .build();
            case 6:
                return this.value.match(new RegExp(SIX_DIGITS_HEX_COLOR_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a 6 digits hexadecimal color but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.value.match(
                    new RegExp(`${THREE_DIGITS_HEX_COLOR_PATTERN}|${SIX_DIGITS_HEX_COLOR_PATTERN}`)
                ) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a hexadecimal color but is not: ${this.value}`)
                          .build();
        }
    }
}
