import { StringRuleChecker } from './string-rule-checker';
import { StringPosition } from './string-types';

import { GuardResult } from '../../core/guard-result';

export class StringContains extends StringRuleChecker<{ type: 'contains'; value: string; pos?: StringPosition }> {
    constructor(rule: { type: 'contains'; value: string; pos?: StringPosition }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.pos) {
            case 'start':
                return this.startsWith()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to start with ${this.rule.value} but does not: ${this.value}`
                          )
                          .build();
            case 'end':
                return this.endsWith()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to end with ${this.rule.value} but does not: ${this.value}`)
                          .build();
            default:
                return this.contains()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to contain ${this.rule.value} but does not: ${this.value}`)
                          .build();
        }
    }

    private contains(): boolean {
        return this.value.indexOf(this.rule.value) !== -1;
    }

    private startsWith(): boolean {
        return this.value.startsWith(this.rule.value) !== false;
    }

    private endsWith(): boolean {
        return this.value.endsWith(this.rule.value) !== false;
    }
}
