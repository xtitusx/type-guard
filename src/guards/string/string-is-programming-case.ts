import { StringRuleChecker } from './string-rule-checker';
import { ProgrammingConvention } from './string-types';

import { GuardResult } from '../../core/guard-result';

export class StringIsProgrammingCase extends StringRuleChecker<{
    type: 'isProgrammingCase';
    convention: ProgrammingConvention;
}> {
    constructor(rule: { type: 'isProgrammingCase'; convention: ProgrammingConvention }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.convention) {
            case 'camelCase':
                // TODO
                return this.value.trim() === this.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow camelCase naming convention but does not: ${this.value}`
                          )
                          .build();
        }
    }
}
