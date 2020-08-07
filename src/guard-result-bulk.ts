import { GuardResult } from './guard-result';

/**
 * @class GuardResultBulk
 * @description Collection de résultats de garde.
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
     * Méthode qui retourne en résultat :
     * - soit la première garde en échec de la liste.
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
     * - soit les gardes en échec de la liste.
     * - soit un succès.
     * @todo
     * @return GuardResult | Array<GuardResult>
     */
    public stack(): GuardResult | Array<GuardResult> {
        throw new Error('Method not implemented.');
    }
}
