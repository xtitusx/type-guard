import { StringRuleChecker } from './string-rule-checker';

import { Codex } from '../../codex';
import { GuardResult } from '../../core/guard-result';
import { Iso639Part1Alpha2 } from '../../dictionaries/iso-639-part1-alpha-2.enum';

export class StringIsIso639Part1Alpha2 extends StringRuleChecker<{ type: 'isIso639Part1Alpha2' }> {
    constructor(rule: { type: 'isIso639Part1Alpha2' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIso639Part1Alpha2()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an ISO 639-1 alpha-2 language code but is not: ${this.value}`)
                  .build();
    }

    private isIso639Part1Alpha2(): boolean {
        return Codex.iso639Part1Alpha2Codes().includes(this.value as Iso639Part1Alpha2);
    }
}
