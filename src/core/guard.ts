import { GuardResult } from './guard-result';

export type Rule = { type: string };

export interface IGuardOptions {
    /**
     * A single type of rule, the last called in the chain, is retained by the guard.
     * @defaultValue false
     */
    overrideRule?: boolean;
}

interface IGuardResultOptions {
    propertyName?: string;
    /**
     * The custom message used instead of the default message.
     */
    customMessage?: string;
}

export abstract class Guard<T extends Rule> {
    protected rules?: T[];
    protected options?: IGuardOptions;
    protected propertyValue: unknown;
    protected combinedGuardResult: GuardResult;

    constructor(options?: IGuardOptions) {
        this.rules = [];
        this.options = options;
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
     * Adds a rule to the rule list.
     * @remarks Method has two different behaviors, depending on the 'options.overrideRule' flag:
     * ```ts
     * - false: Adds a rule to the list. Default behavior.
     * - true: Adds a rule type to the rule list, or replaces an already existing rule type. A single type of rule is therefore retained by the guard.
     * ```
     * @param rule
     */
    protected addRule(rule: T): void {
        this.rules =
            this.options?.overrideRule === true
                ? [...this.rules.filter((r) => r.type !== rule.type), rule]
                : [...this.rules, rule];
    }

    /**
     * Checks :
     * - Type.
     * - The set of chained rules.
     * @param propertyValue
     * @param options
     */
    public guard(propertyValue: unknown, options?: IGuardResultOptions): GuardResult {
        this.propertyValue = propertyValue;
        this.combinedGuardResult = new GuardResult.Builder()
            .withSuccess(true)
            .withPropertyName(options?.propertyName)
            .build();

        this.typeGuard();

        if (!this.getCombinedGuardResult().isSuccess()) {
            if (options?.customMessage) {
                this.getCombinedGuardResult().setMessage(options.customMessage);
            }

            return this.getCombinedGuardResult();
        }

        for (const rule of this.rules) {
            const guardResult = this.checkRule(rule, propertyValue);
            if (!guardResult.isSuccess()) {
                this.getCombinedGuardResult().setSuccess(false);
                this.getCombinedGuardResult().setMessage(options?.customMessage ?? guardResult.getMessage());
                return this.getCombinedGuardResult();
            }
        }

        return this.getCombinedGuardResult();
    }
}
