import { StringRuleChecker } from './string-rule-checker';

import { Codex } from '../../codex';
import { GuardResult } from '../../core/guard-result';
import { Iso4217Alpha3 } from '../../dictionaries/iso-4217-alpha-3.enum';

export class StringIsIso4217Alpha3 extends StringRuleChecker<{ type: 'isIso4217Alpha3' }> {
    constructor(rule: { type: 'isIso4217Alpha3' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIso4217Alpha3()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an ISO 4217 alpha-3 currency code but is not: ${this.value}`)
                  .build();
    }

    private isIso4217Alpha3(): boolean {
        return Codex.iso4217Alpha3Codes().includes(this.value as Iso4217Alpha3);
    }
}
