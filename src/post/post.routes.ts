import {FastifyInstance, FastifyRequest} from "fastify";
import * as t from 'io-ts'
import {CreatePostController} from "./post.controllers";
import {postService} from "./post.service";
import {controllerHandler} from "../shared/controllerHandler";

export const CreatePostPayload = t.type({
    title: t.string,
    content: t.string,
    blog: t.string
})

export type CreatePostPayload = t.TypeOf<typeof CreatePostPayload>

export const CreatePostRoute = (fastify: FastifyInstance): FastifyInstance => fastify.post<{ Body: CreatePostPayload }>(
    '/post',
    {
        schema: {
            body: CreatePostPayload
        },
    }, controllerHandler(({ body }: FastifyRequest) => CreatePostController(postService, body as CreatePostPayload)))
