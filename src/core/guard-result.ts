interface IGuardResult {
    success: boolean;
    message?: string;
    propertyName?: string;
}

export class GuardResult implements IGuardResult {
    success: boolean;
    message?: string;
    propertyName?: string;

    public isSuccess(): boolean {
        return this.success;
    }

    public setSuccess(success: boolean): void {
        this.success = success;
    }

    /**
     * @remarks The message is prefixed with the name of the property if available.
     * @returns The reason for the failure of the guard.
     */
    public getMessage(): string {
        return this.propertyName
            ? `Property ${this.propertyName} has failed the guard validation: ${this.message}`
            : this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    public setPropertyName(propertyName: string): void {
        this.propertyName = propertyName;
    }

    constructor(build?: IGuardResult) {
        if (build) {
            Object.assign(this, build);
        }
    }

    static get Builder(): any {
        return class Builder {
            success: boolean;
            message?: string;
            propertyName?: string;

            constructor() {
                // Nullary constructor
            }
            withSuccess(success: boolean): this {
                this.success = success;
                return this;
            }
            withMessage(message: string): this {
                this.message = message;
                return this;
            }
            withPropertyName(propertyName: string): this {
                this.propertyName = propertyName;
                return this;
            }

            build(): GuardResult {
                return new GuardResult(this);
            }
        };
    }
}
