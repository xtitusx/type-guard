import { StringRuleChecker } from './string-rule-checker';
import { AlphaVersion } from './string-types';

import { Codex } from '../../codex';
import { GuardResult } from '../../core/guard-result';
import { Iso3166Part1Alpha2 } from '../../dictionaries/iso-3166-part1-alpha-2.enum';
import { Iso3166Part1Alpha3 } from '../../dictionaries/iso-3166-part1-alpha-3.enum';

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
                              `string is expected to be an ISO 3166-1 alpha-2 country code but is not: ${this.value}`
                          )
                          .build();
            case '3':
                return this.isIso3166Part1Alpha3()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an ISO 3166-1 alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isIso3166Part1Alpha()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an ISO 3166-1 alpha-2 or alpha-3 country code but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isIso3166Part1Alpha2(): boolean {
        return Codex.iso3166Part1Alpha2().includes(this.value as Iso3166Part1Alpha2);
    }

    private isIso3166Part1Alpha3(): boolean {
        return Codex.iso3166Part1Alpha3().includes(this.value as Iso3166Part1Alpha3);
    }

    private isIso3166Part1Alpha(): boolean {
        return this.isIso3166Part1Alpha2() || this.isIso3166Part1Alpha3();
    }
}
