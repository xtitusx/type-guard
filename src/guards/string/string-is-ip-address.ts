import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { IPV4_PATTERN, IPV6_PATTERN } from '../../utils/pattern-constants';

export class StringIsIPAddress extends StringRuleChecker<{ type: 'isIPAddress'; version?: 4 | 6 }> {
    constructor(rule: { type: 'isIPAddress'; version?: 4 | 6 }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case 4:
                return this.value.match(new RegExp(IPV4_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a IPv4 address but is not: ${this.value}`)
                          .build();
            case 6:
                return this.value.match(new RegExp(IPV6_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a IPv6 address but is not: ${this.value}`)
                          .build();
            default:
                return this.value.match(new RegExp(`${IPV4_PATTERN}|${IPV6_PATTERN}`)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a IP address but is not: ${this.value}`)
                          .build();
        }
    }
}
