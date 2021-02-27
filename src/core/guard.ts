import { GuardResult } from './guard-result';

export type Rule = { type: string };

export abstract class Guard<T extends Rule> {
    protected rules?: T[];
    protected propertyValue: unknown;
    protected combinedGuardResult: GuardResult;

    constructor(rules?: T[]) {
        this.rules = Array.isArray(rules) ? rules : [];
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
     * Méthode qui renvoie le résultat de la méthode guard().
     *
     * La garde court-circuite la vérification dès qu'une règle n'est pas observée.
     */
    protected getCombinedGuardResult(): GuardResult {
        return this.combinedGuardResult;
    }

    /**
     * Méthode qui ajoute un type de règle à la liste de règles, ou remplace un type de règle déjà existant.
     *
     * Un seul type de règle est donc retenu dans la garde.
     * @param rule
     */
    protected addRule(rule: T): void {
        this.rules = [...this.rules.filter((r) => r.type !== rule.type), rule];
    }

    /**
     * Méthode qui vérifie :
     * - le typage.
     * - l'ensemble des règles chaînées.
     * @param propertyValue unknown
     * @param propertyName string (optionnel)
     * @return GuardResult
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
