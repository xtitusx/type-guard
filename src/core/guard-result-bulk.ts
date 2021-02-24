import { GuardResult } from './guard-result';

/**
 * @class GuardResultBulk
 * @description GuardResult collection.
 */
export class GuardResultBulk {
    private guardResults: GuardResult[];

    constructor() {
        this.guardResults = [];
    }

    /**
     * Méthode qui empile les résultats de garde.
     * @param guardResults GuardResult | GuardResult[]
     */
    public add(guardResults: GuardResult | GuardResult[]): this {
        if (guardResults) {
            Array.isArray(guardResults)
                ? this.guardResults.push(...(guardResults as []))
                : this.guardResults.push(guardResults as GuardResult);
        }
        return this;
    }

    /**
     * Méthode qui retourne en résultat :
     * - soit la première garde de la liste en échec.
     * - soit un succès.
     * @return GuardResult
     */
    public combine(): GuardResult {
        for (const guardResult of this.guardResults) {
            if (!guardResult?.isSuccess()) {
                return guardResult;
            }
        }

        return new GuardResult.Builder().withSuccess(true).build();
    }

    /**
     * Méthode qui retourne en résultat :
     * - soit les gardes de la liste en échec.
     * - soit un succès.
     * @return GuardResult[]
     */
    public stack(): GuardResult[] {
        const fails = [...this.guardResults.filter((guardResult) => !guardResult?.isSuccess())];

        return fails.length ? fails : [...fails, new GuardResult.Builder().withSuccess(true).build()];
    }
}
