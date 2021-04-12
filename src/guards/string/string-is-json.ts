import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsJson extends StringRuleChecker<{ type: 'isJson' }> {
    constructor(rule: { type: 'isJson' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isJson()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a JSON string but is not: ${this.value}`)
                  .build();
    }

    private isJson(): boolean {
        try {
            JSON.parse(this.value);
            return true;
        } catch (err) {
            return false;
        }
    }
}
