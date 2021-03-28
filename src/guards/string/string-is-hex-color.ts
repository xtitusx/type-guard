import { StringRuleChecker } from './string-rule-checker';
import { HExColorDigits } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * 3 digits hex color pattern:
 * - Not case sensitive.
 */
export const THREE_DIGITS_HEX_COLOR_PATTERN = '^#[0-9a-fA-F]{3}$';

/**
 * 6 digits hex color pattern:
 * - Not case sensitive.
 */
export const SIX_DIGITS_HEX_COLOR_PATTERN = '^#[0-9a-fA-F]{6}$';

export class StringIsHexColor extends StringRuleChecker<{ type: 'isHexColor'; digits?: HExColorDigits }> {
    constructor(rule: { type: 'isHexColor'; digits?: HExColorDigits }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.digits) {
            case '3':
                return this.is3DigitsHexColor()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a 3 digits hexadecimal color but is not: ${this.value}`
                          )
                          .build();
            case '6':
                return this.is6DigitsHexColor()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a 6 digits hexadecimal color but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isHexColor()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a hexadecimal color but is not: ${this.value}`)
                          .build();
        }
    }

    private is3DigitsHexColor(): boolean {
        return this.value.match(new RegExp(THREE_DIGITS_HEX_COLOR_PATTERN)) !== null;
    }

    private is6DigitsHexColor(): boolean {
        return this.value.match(new RegExp(SIX_DIGITS_HEX_COLOR_PATTERN)) !== null;
    }

    private isHexColor(): boolean {
        return this.is3DigitsHexColor() || this.is6DigitsHexColor();
    }
}
