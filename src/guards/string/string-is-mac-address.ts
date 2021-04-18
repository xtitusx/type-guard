import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * MAC address pattern.
 * @see {@link https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf}
 */
export const MAC_ADDRESS_PATTERN = '^((([0-9A-F]{2}-){5})|(([0-9a-f]{2}:){5}))[0-9a-f]{2}$';

export class StringIsMacAddress extends StringRuleChecker<{ type: 'isMacAddress' }> {
    constructor(rule: { type: 'isMacAddress' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isMacAddress()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be a MAC address but is not: ${this.value}`)
                  .build();
    }

    private isMacAddress(): boolean {
        return this.value.match(new RegExp(MAC_ADDRESS_PATTERN)) !== null;
    }
}
