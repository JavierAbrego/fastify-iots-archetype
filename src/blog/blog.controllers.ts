import {ControllerResponse} from "../shared/domain/ControllerResponse";
import {Blog} from "./blog.domain";
import {CreateBlogPayload, GetBlogParams, GetBlogQueryString} from "./blog.routes";
import {Post} from "../post/post.domain";
import {postService, PostService} from "../post/post.service";
import {blogService, BlogService} from "./blog.service";

type GetBlogResponse = Blog & { _embedded?: { posts: ReadonlyArray<Post> } }
export const GetBlogController = async (postService: PostService, blogService: BlogService, {slug}: GetBlogParams, query: GetBlogQueryString): Promise<ControllerResponse<GetBlogResponse>> => {
    const hasToGetPosts = query.embed === 'posts'
    const _embedded = hasToGetPosts ? {posts: await postService.getPostsBySlug(slug)} : undefined
    const blog = await blogService.getBlogBySlug(slug)
    return {
        body: {...blog, _embedded} as GetBlogResponse,
        statusCode: 200
    }
}

export const CreateBlogController = async ({slug, name, posts}: CreateBlogPayload): Promise<ControllerResponse<Blog>> => {
    const blog = await blogService.createBlog(slug, name)
    posts && await postService.createPosts(posts.map(post=>({...post, blog:slug})))
    return { body: {...blog}, statusCode: 200 }
}
