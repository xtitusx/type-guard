import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsIPAddress
 */
export class IsIPAddress extends StringRuleChecker<{ type: 'isIPAddress'; version?: 4 | 6 }> {
    constructor(rule: { type: 'isIPAddress'; version?: 4 | 6 }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case 4:
                return this.value.match(new RegExp('TODO')) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a IPv4 address but is not: ${this.value}`)
                          .build();
            case 6:
                return this.value.match(new RegExp('TODO')) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a IPv6 address but is not: ${this.value}`)
                          .build();
        }
    }
}
