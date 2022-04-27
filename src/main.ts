import {AppConfiguration, appConfiguration} from "./configuration/appConfiguration";
import fastify, {FastifyInstance} from "fastify";
import {validateWithIOTS} from "./shared/validateWithIOTS";
import {pipe} from "fp-ts/function";
import {CreateBlogRoute, GetBlogRoute} from "./blog/blog.routes";
import {CreatePostRoute} from "./post/post.routes";

async function bootstrap(appConfiguration: AppConfiguration) {
    const fastifyInstance: FastifyInstance = fastify({logger: true})

    fastifyInstance.setValidatorCompiler(validateWithIOTS)

    pipe(fastifyInstance,
        GetBlogRoute,
        CreateBlogRoute,
        CreatePostRoute,
        (instance) =>
            instance.get('/__info', {
                logLevel: 'trace',
                handler(_request, reply) {
                    reply.send({
                        message: `I am alive at ${new Date().toLocaleString()}`,
                        branch: process.env.BRANCH,
                        commit: process.env.COMMIT,
                    })
                },
            })
    )

    fastifyInstance.ready(() => fastifyInstance.log.info(`Routes:\n${fastifyInstance.printRoutes()}`))
    fastifyInstance.listen(appConfiguration.port, '0.0.0.0')
        .then(() => fastifyInstance.log.debug('server has started'))
        .catch(() => fastifyInstance.log.error('error when creating the server'))
}

bootstrap(appConfiguration)
