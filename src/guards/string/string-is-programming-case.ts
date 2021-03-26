import { StringRuleChecker } from './string-rule-checker';
import { ProgrammingConvention } from './string-types';

import { GuardResult } from '../../core/guard-result';
import {
    CAMEL_CASE_PATTERN,
    DOT_CASE_PATTERN,
    KEBAB_CASE_PATTERN,
    PASCAL_CASE_PATTERN,
    QUIET_SNAKE_CASE_PATTERN,
    SCREAMING_SNAKE_CASE_PATTERN,
} from '../../utils/pattern-constants';

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
            case 'PascalCase':
                return this.value.match(new RegExp(PASCAL_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow PascalCase naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'camelCase':
                return this.value.match(new RegExp(CAMEL_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow camelCase naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'quiet_snake_case':
                return this.value.match(new RegExp(QUIET_SNAKE_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow quiet_snake_case naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'SCREAMING_SNAKE_CASE':
                return this.value.match(new RegExp(SCREAMING_SNAKE_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow SCREAMING_SNAKE_CASE naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'kebab-case':
                return this.value.match(new RegExp(KEBAB_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow kebab-case naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'dot.case':
                return this.value.match(new RegExp(DOT_CASE_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow dot.case naming convention but does not: ${this.value}`
                          )
                          .build();
        }
    }
}
