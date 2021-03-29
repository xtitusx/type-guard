import { StringRuleChecker } from './string-rule-checker';
import { IpVersion } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * IP address v4 pattern.
 */
export const IPV4_PATTERN =
    '^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])[.]){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';

/**
 * IP address v6 pattern matching:
 * - IPv6 addresses.
 * - Zero compressed IPv6 addresses (section 2.2 of rfc5952).
 * - Link-local IPv6 addresses with zone index (section 11 of rfc4007).
 * - IPv4-Embedded IPv6 Address (section 2 of rfc6052).
 * - IPv4-mapped IPv6 addresses (section 2.1 of rfc2765).
 * - IPv4-translated addresses (section 2.1 of rfc2765).
 */
export const IPV6_PATTERN =
    '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])[.]){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])[.]){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$';

export class StringIsIpAddress extends StringRuleChecker<{ type: 'isIpAddress'; version?: IpVersion }> {
    constructor(rule: { type: 'isIpAddress'; version?: IpVersion }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case '4':
                return this.isIpAddressV4()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IPv4 address but is not: ${this.value}`)
                          .build();
            case '6':
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
