import {FastifySchemaCompiler} from "fastify";
import {Any, ContextEntry, Decoder, Errors, ValidationError} from "io-ts";
import * as Either from "fp-ts/Either";
import {pipe} from "fp-ts/function";
import {ControlledError} from "./domain/ControlledError";

const decode = function decode<D, S = unknown>(
    decoder: Decoder<unknown, D>,
    data: S,
): Either.Either<ControlledError, D> {
    return pipe(decoder.decode(data), Either.mapLeft(returnError))
}

function returnError(e: Errors) {
    const message = JSON.stringify(e.map(getMessage))
    return new ControlledError('Validation error', message, 422)
}

function getMessage(e: ValidationError): {
    readonly message: string
    readonly path: string
} {
    const message = e.message !== undefined ? e.message : `Invalid value ${e.value} for`
    return {
        message,
        path: e.context.map(({key}: ContextEntry) => key).filter(Boolean).join('/'),
    }
}

type ValidationResult = { readonly error?: Error; readonly value?: unknown }

export const validateWithIOTS: FastifySchemaCompiler<Any> = ({schema}) =>
    (data: unknown): ValidationResult =>
        pipe(decode(schema, data),
            Either.fold<ControlledError, unknown, ValidationResult>(
                (error: ControlledError) => ({error}),
                (value) => ({value}),
            )
        )

