import {ControllerResponse, returnUnexpectedError} from "./domain/ControllerResponse";
import {FastifyReply, FastifyRequest} from "fastify";

export function controllerHandler<B>(controllerProcessor: (request: FastifyRequest) => Promise<ControllerResponse<B>>) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        let response
        try {
            response = await controllerProcessor(request)
        } catch (e) {
            response = returnUnexpectedError()
        }
        const {statusCode, body} = response
        reply.status(statusCode).send(body)
    }
}
