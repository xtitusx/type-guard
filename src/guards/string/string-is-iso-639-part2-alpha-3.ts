import { StringRuleChecker } from './string-rule-checker';
import { Iso639Part2Alpha3Set } from './string-types';

import { Codex } from '../../codex';
import { GuardResult } from '../../core/guard-result';
import {
    Iso639Part2Alpha3B,
    Iso639Part2Alpha3T,
    Iso639Part2Alpha3,
} from '../../dictionaries/iso-639-part2-alpha-3.enum';

export class StringIsIso639Part2Alpha3 extends StringRuleChecker<{
    type: 'isIso639Part2Alpha3';
    set?: Iso639Part2Alpha3Set;
}> {
    constructor(rule: { type: 'isIso639Part2Alpha3'; set?: Iso639Part2Alpha3Set }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.set) {
            case 'bibliographic':
                return this.isIso639Part2Alpha3('bibliographic')
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an ISO 639-2 alpha-3 bibliographic language code but is not: ${this.value}`
                          )
                          .build();
            case 'terminologic':
                return this.isIso639Part2Alpha3('terminologic')
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an ISO 639-2 alpha-3 terminologic language code but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isIso639Part2Alpha3()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be an ISO 639-2 alpha-3 language code but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isIso639Part2Alpha3(set?: Iso639Part2Alpha3Set): boolean {
        switch (set) {
            case 'bibliographic':
                return (Codex.iso639Part2Alpha3Codes('bibliographic') as Iso639Part2Alpha3B[]).includes(
                    this.value as Iso639Part2Alpha3B
                );
            case 'terminologic':
                return (Codex.iso639Part2Alpha3Codes('terminologic') as Iso639Part2Alpha3T[]).includes(
                    this.value as Iso639Part2Alpha3T
                );
            default:
                return (Codex.iso639Part2Alpha3Codes() as Iso639Part2Alpha3[]).includes(
                    this.value as Iso639Part2Alpha3
                );
        }
    }
}
