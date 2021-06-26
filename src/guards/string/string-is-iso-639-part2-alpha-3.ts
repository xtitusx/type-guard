import { StringRuleChecker } from './string-rule-checker';

import { Codex } from '../../codex';
import { GuardResult } from '../../core/guard-result';
import { Iso639Part2Alpha3 } from '../../dictionaries/iso-639-part2-alpha-3.enum';

export class StringIsIso639Part2Alpha3 extends StringRuleChecker<{ type: 'isIso639Part2Alpha3' }> {
    constructor(rule: { type: 'isIso639Part2Alpha3' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIso639Part2Alpha3()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an ISO 639-2 alpha-3 language code but is not: ${this.value}`)
                  .build();
    }

    private isIso639Part2Alpha3(): boolean {
        return Codex.iso639Part2Alpha3Codes().includes(this.value as Iso639Part2Alpha3);
    }
}
