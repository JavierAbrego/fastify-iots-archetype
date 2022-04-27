import {ControlledError} from "./ControlledError";

export type ControllerResponse<B> = {
    statusCode: number,
    body: B
}

export const returnUnexpectedError = (message='An error occurred')=>({
    statusCode: 500,
    body: new ControlledError('Unexpected error', message, 500)
})
