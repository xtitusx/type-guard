import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { IPV4_PATTERN, IPV6_PATTERN } from '../../utils/pattern-constants';

export class StringIsIpAddress extends StringRuleChecker<{ type: 'isIpAddress'; version?: 4 | 6 }> {
    constructor(rule: { type: 'isIpAddress'; version?: 4 | 6 }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case 4:
                return this.isIpAddressV4()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IPv4 address but is not: ${this.value}`)
                          .build();
            case 6:
                return this.isIpAddressV6()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IPv6 address but is not: ${this.value}`)
                          .build();
            default:
                return this.isIpAddress()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IP address but is not: ${this.value}`)
                          .build();
        }
    }

    private isIpAddressV4(): boolean {
        return this.value.match(new RegExp(IPV4_PATTERN)) !== null;
    }

    private isIpAddressV6(): boolean {
        return this.value.match(new RegExp(IPV6_PATTERN)) !== null;
    }

    private isIpAddress(): boolean {
        return this.isIpAddressV4() || this.isIpAddressV6();
    }
}
