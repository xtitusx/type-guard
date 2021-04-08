import { StringRuleChecker } from './string-rule-checker';
import { AlphaVersion } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { Iso3166Part1Alpha2Enum } from '../../dictionaries/iso-3166-part1-alpha-2';
import { Iso3166Part1Alpha3Enum } from '../../dictionaries/iso-3166-part1-alpha-3';

export class StringIsIso3166Part1Alpha extends StringRuleChecker<{
    type: 'isIso3166Part1Alpha';
    version?: AlphaVersion;
}> {
    constructor(rule: { type: 'isIso3166Part1Alpha'; version?: AlphaVersion }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case '2':
                return this.isIso3166Part1Alpha2()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-2 country code but is not: ${this.value}`
                          )
                          .build();
            case '3':
                return this.isIso3166Part1Alpha3()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isIso3166Part1Alpha()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an Iso 3166-1 alpha-2 or alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isIso3166Part1Alpha2(): boolean {
        return (Object.values(Iso3166Part1Alpha2Enum) as any).includes(this.value);
    }

    private isIso3166Part1Alpha3(): boolean {
        return (Object.values(Iso3166Part1Alpha3Enum) as any).includes(this.value);
    }

    private isIso3166Part1Alpha(): boolean {
        return this.isIso3166Part1Alpha2() || this.isIso3166Part1Alpha3();
    }
}
