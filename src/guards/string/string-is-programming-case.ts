import { StringRuleChecker } from './string-rule-checker';
import { ProgrammingConvention } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { CAMEL_CASE_PATTERN, PASCAL_CASE_PATTERN } from '../../utils/pattern-constants';

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
                return this.value.match(new RegExp(CAMEL_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow camelCase naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'PascalCase':
                return this.value.match(new RegExp(PASCAL_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow PascalCase naming convention but does not: ${this.value}`
                          )
                          .build();
        }
    }
}
