import { StringRuleChecker } from './string-rule-checker';
import { IIsDecimalOptions } from './string-options';

import { GuardResult } from '../../core/guard-result';
import { DECIMAL_PATTERN } from '../../utils/pattern-constants';

enum DECIMAL_SEPARATOR {
    POINT = '.',
    COMMA = ',',
}

export class StringIsDecimal extends StringRuleChecker<{ type: 'isDecimal'; options?: IIsDecimalOptions }> {
    constructor(rule: { type: 'isDecimal'; options?: IIsDecimalOptions }, value: string) {
        super(rule, value);
    }

    public exec(): GuardResult {
        if (this.value.match(new RegExp(DECIMAL_PATTERN)) === null) {
            return new GuardResult.Builder()
                .withSuccess(false)
                .withMessage(`string is expected to be a decimal number but is not: ${this.value}`)
                .build();
        }

        if (this.rule.options) {
            if (this.rule.options.force === true && !this.hasDecimalSeparator()) {
                return new GuardResult.Builder()
                    .withSuccess(false)
                    .withMessage(
                        `string is expected to be a decimal number with a fractional part but is not: ${this.value}`
                    )
                    .build();
            }

            if (this.rule.options.precision) {
                const precision = this.calculatePrecision();
                if (precision > this.rule.options.precision) {
                    return new GuardResult.Builder()
                        .withSuccess(false)
                        .withMessage(
                            `string is expected to be a decimal number with a fractional part max lenght of ${this.rule.options.precision} but has a fractional part length of: ${precision}`
                        )
                        .build();
                }
            }
        }

        return new GuardResult.Builder().withSuccess(true).build();
    }

    private hasDecimalSeparator(): boolean {
        return this.value.includes(DECIMAL_SEPARATOR.POINT) || this.value.includes(DECIMAL_SEPARATOR.COMMA);
    }

    private calculatePrecision(): number {
        return !this.hasDecimalSeparator()
            ? 0
            : this.value.replace(DECIMAL_SEPARATOR.COMMA, DECIMAL_SEPARATOR.POINT).split(DECIMAL_SEPARATOR.POINT)[1]
                  .length;
    }
}
