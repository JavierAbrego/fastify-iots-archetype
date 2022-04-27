export class ControlledError extends Error {
    public readonly errorType: string
    public readonly message: string
    public readonly errorCode: number

    constructor(
        errorType: string,
        message: string,
        errorCode: number,
    ) {
        super(message)
        this.errorType = errorType
        this.message = message
        this.errorCode = errorCode
    }

}
