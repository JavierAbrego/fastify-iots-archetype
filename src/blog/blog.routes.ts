import {FastifyInstance, FastifyRequest} from "fastify";
import * as t from 'io-ts'
import {CreateBlogController, GetBlogController} from "./blog.controllers";
import {Blog} from "./blog.domain";
import {postService} from "../post/post.service";
import {blogService} from "./blog.service";
import {controllerHandler} from "../shared/controllerHandler";

export const GetBlogParams = t.type({slug: t.string})
export type GetBlogParams = t.TypeOf<typeof GetBlogParams>

const TitleAndContent = t.type({title:t.string, content:t.string })
export const CreateBlogPayload = t.type({
    ...Blog.props,
    posts: t.union([t.array(TitleAndContent), t.undefined])
})
export type CreateBlogPayload = t.TypeOf<typeof CreateBlogPayload>

export const GetBlogQueryString = t.type({
    embed: t.union([t.string, t.undefined])
})
export type GetBlogQueryString = t.TypeOf<typeof GetBlogQueryString>

export const GetBlogRoute = (fastify: FastifyInstance): FastifyInstance => fastify.get<{ Params: GetBlogParams, Querystring: GetBlogQueryString }>(
    '/blog/:slug',
    {
        schema: {
            params: GetBlogParams,
            querystring: GetBlogQueryString,
        },
    }, controllerHandler(({params, query}: FastifyRequest) => GetBlogController(postService, blogService, params as GetBlogParams, query as GetBlogQueryString)))

export const CreateBlogRoute = (fastify: FastifyInstance): FastifyInstance => fastify.post<{ Body: CreateBlogPayload }>(
    '/blog',
    {
        schema: {
            body: CreateBlogPayload
        },
    }, controllerHandler(({body}: FastifyRequest) => CreateBlogController(body as CreateBlogPayload)))


