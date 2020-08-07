import { GuardResult } from './guard-result';

/**
 * @class GuardResultBulk
 * @description Collection des résultats de garde.
 */
export class GuardResultBulk {
    private guardResults: Array<GuardResult>;

    constructor() {
        this.guardResults = [];
    }

    /**
     * Méthode qui empile les résultats de garde.
     * @param guardResults GuardResult | Array<GuardResult>
     */
    public add(guardResults: GuardResult | Array<GuardResult>): this {
        if (guardResults) {
            Array.isArray(guardResults)
                ? this.guardResults.push(...(guardResults as []))
                : this.guardResults.push(guardResults as GuardResult);
        }
        return this;
    }

    /**
     * Méthode qui retourne le résultat de :
     * - soit la première garde en échec de la liste.
     * - soit une garde en succès.
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
     * Méthode qui retourne :
     * - soit les résultats des gardes en échec.
     * - soit le résultat d'une garde en succès générique.
     * @todo
     * @return GuardResult | Array<GuardResult>
     */
    public stack(): GuardResult | Array<GuardResult> {
        throw new Error('Method not implemented.');
    }
}
