import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { Iso639Part1Alpha2Enum } from '../../dictionaries/iso-639-part1-alpha-2.enum';

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
        return (Object.values(Iso639Part1Alpha2Enum) as any).includes(this.value);
    }
}
