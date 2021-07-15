import { NumberRuleChecker } from './number-rule-checker';
import { NetworkPortRange } from './number-types';

import { GuardResult } from '../../core/guard-result';

export class NumberIsNetworkPort extends NumberRuleChecker<{ type: 'isNetworkPort'; range?: NetworkPortRange }> {
    constructor(rule: { type: 'isNetworkPort'; range?: NetworkPortRange }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.range) {
            case 'well-known':
                return this.isWellKnownPort()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a well-known network port (1-1023) but is not: ${this.value}`
                          )
                          .build();
            case 'registered':
                return this.isRegisteredPort()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a registered network port (1024-49151) but is not: ${this.value}`
                          )
                          .build();
            case 'private':
                return this.isPrivatePort()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a private network port (49152-65535) but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isPort()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a network port (1-65535) but is not: ${this.value}`)
                          .build();
        }
    }

    private isWellKnownPort(): boolean {
        return Number.isInteger(this.value) && this.value >= 1 && this.value <= 1023;
    }

    private isRegisteredPort(): boolean {
        return Number.isInteger(this.value) && this.value >= 1024 && this.value <= 49151;
    }

    private isPrivatePort(): boolean {
        return Number.isInteger(this.value) && this.value >= 49152 && this.value <= 65535;
    }

    private isPort(): boolean {
        return Number.isInteger(this.value) && this.value >= 1 && this.value <= 65535;
    }
}
