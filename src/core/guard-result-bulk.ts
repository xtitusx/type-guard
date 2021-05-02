import { GuardResult } from './guard-result';

export class GuardResultBulk {
    private guardResults: GuardResult[];

    constructor() {
        this.guardResults = [];
    }

    /**
     * Adds GuardResult instance(s) in bulk.
     * @param guardResults
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
     * @returns
     * - Either the first fail in bulk.
     * - Or only one success.
     */
    public combine(): GuardResult {
        for (const guardResult of this.guardResults) {
            if (guardResult && !guardResult.isSuccess()) {
                return guardResult;
            }
        }

        return new GuardResult.Builder().withSuccess(true).build();
    }

    /**
     * @returns
     * - Either all fails in bulk.
     * - Or only one success.
     */
    public stack(): GuardResult[] {
        const fails = [...this.guardResults.filter((guardResult) => guardResult && !guardResult.isSuccess())];

        return fails.length ? fails : [...fails, new GuardResult.Builder().withSuccess(true).build()];
    }
}
