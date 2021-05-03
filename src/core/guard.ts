import { GuardResult } from './guard-result';

export type Rule = { type: string };

export abstract class Guard<T extends Rule> {
    protected rules?: T[];
    protected propertyValue: unknown;
    protected combinedGuardResult: GuardResult;

    constructor() {
        this.rules = [];
    }

    /**
     * Checks the rule on a trusted property after type guarding.
     * @param rule
     * @param value
     */
    protected abstract checkRule(rule: T, value: unknown): GuardResult;

    /**
     * Checks the type or others conditions of a non trusted property before rules checking.
     */
    protected abstract typeGuard(): void;

    /**
     * Returns the result of guard() method.
     * @remarks The guard bypasses the check as soon as a rule is not observed.
     */
    protected getCombinedGuardResult(): GuardResult {
        return this.combinedGuardResult;
    }

    /**
     * Adds a rule type to the rule list, or replaces an already existing rule type.
     * @remarks A single type of rule is therefore retained in the guard.
     * @param rule
     */
    protected addRule(rule: T): void {
        this.rules = [...this.rules.filter((r) => r.type !== rule.type), rule];
    }

    /**
     * Checks :
     * - Type.
     * - The set of chained rules.
     * @param propertyValue
     * @param propertyName
     */
    public guard(propertyValue: unknown, propertyName?: string): GuardResult {
        this.propertyValue = propertyValue;
        this.combinedGuardResult = new GuardResult.Builder().withSuccess(true).withPropertyName(propertyName).build();

        this.typeGuard();

        if (!this.getCombinedGuardResult().isSuccess()) {
            return this.getCombinedGuardResult();
        }

        for (const rule of this.rules) {
            const guardResult = this.checkRule(rule, propertyValue);
            if (!guardResult.isSuccess()) {
                this.getCombinedGuardResult().setSuccess(false);
                this.getCombinedGuardResult().setMessage(guardResult.getMessage());
                return this.getCombinedGuardResult();
            }
        }

        return this.getCombinedGuardResult();
    }
}
