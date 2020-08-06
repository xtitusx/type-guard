import { GuardResult } from './guard-result';

/**
 * @class Result
 */
export class Result<T> {
    private success: boolean;
    private guardResult: GuardResult;
    private value: T;

    private constructor(success: boolean, guardResult?: GuardResult, value?: T) {
        this.success = success;
        this.guardResult = guardResult;
        this.value = value;
    }

    public isSuccess(): boolean {
        return this.success;
    }

    public getGuardResult(): GuardResult {
        return this.guardResult;
    }

    /**
     * Méthode qui renvoie la valeur en cas de succès de la garde.
     * @throws {Error}
     */
    public getValue(): T {
        if (this.success) {
            return this.value;
        }

        throw new Error(this.guardResult.getMessage());
    }

    public static success<U>(value: U): Result<U> {
        return new Result<U>(true, null, value);
    }

    public static fail<U>(guardResult: GuardResult): Result<U> {
        return new Result<U>(false, guardResult);
    }
}
