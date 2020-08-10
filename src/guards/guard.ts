import { GuardResult } from '../guard-result';

type Rule = { type: string };

export abstract class Guard<T extends Rule> {
    protected rules?: T[];
    protected propertyValue: unknown;
    protected combinedGuardResult: GuardResult;

    constructor(rules?: T[]) {
        this.rules = Array.isArray(rules) ? rules : [];
    }

    /**
     * Méthode qui applique une règle sur une valeur dont le typage est de "confiance", conforme à ce que la garde attend.
     *
     * Si le typage de la valeur est incertain, variant, donc sûrement incorrect, alors une erreur risque fortement d'être levée.
     *
     * Le cas échéant, il est préférable d'appeler la méthode guard(), qui applique un contrôle du typage.
     * @param rule T
     * @param value unknown
     */
    public abstract checkRule(rule: T, value: unknown): GuardResult;

    /**
     * Méthode qui vérifie que la valeur n'est ni 'null', ni 'undefined', et que son type est approuvé par la garde utilisée.
     */
    protected abstract guardType(): void;

    /**
     * Méthode qui renvoie le résultat de la méthode guard().
     *
     * La garde court-circuite la vérification dès qu'une règle n'est pas observée.
     */
    protected getCombinedGuardResult(): GuardResult {
        return this.combinedGuardResult;
    }

    /**
     * Méthode qui ajoute une règle à la liste de règles, ou remplace une règle déjà existante.
     *
     * Un seul type de règle est donc retenu dans la garde.
     * @param rule T
     * @param value unknown
     */
    protected addRule(rule: T): T[] {
        return [...this.rules.filter((r) => r.type !== rule.type), rule];
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

        this.guardType();

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
