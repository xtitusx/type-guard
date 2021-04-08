import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { Iso4217AlphaEnum } from '../../dictionaries/iso4217-alpha';

export class StringIsIso4217Alpha extends StringRuleChecker<{ type: 'isIso4217Alpha' }> {
    constructor(rule: { type: 'isIso4217Alpha' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIso4217Alpha()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an Iso 4217 alpha currency code but is not: ${this.value}`)
                  .build();
    }

    private isIso4217Alpha(): boolean {
        return (Object.values(Iso4217AlphaEnum) as any).includes(this.value);
    }
}
