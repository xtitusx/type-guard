import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { Iso31661Alpha2Enum } from '../../utils/iso31661-alpha-2';
import { Iso31661Alpha3Enum } from '../../utils/iso31661-alpha-3';

export class StringIsIso31661Alpha extends StringRuleChecker<{ type: 'isIso31661Alpha'; alpha?: 2 | 3 }> {
    constructor(rule: { type: 'isIso31661Alpha'; alpha?: 2 | 3 }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.alpha) {
            case 2:
                return this.isIso31661Alpha2()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-2 country code but is not: ${this.value}`
                          )
                          .build();
            case 3:
                return this.isIso31661Alpha3()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isIso31661Alpha()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-2 or alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isIso31661Alpha2(): boolean {
        return (Object.values(Iso31661Alpha2Enum) as any).includes(this.value);
    }

    private isIso31661Alpha3(): boolean {
        return (Object.values(Iso31661Alpha3Enum) as any).includes(this.value);
    }

    private isIso31661Alpha(): boolean {
        return this.isIso31661Alpha2() || this.isIso31661Alpha3();
    }
}
