import {Post} from "./post.domain";
import {CreatePostPayload} from "./post.routes";
import {cassandraService} from "../db/cassandra/cassandra.service";

export type PostService = {
    getPostsBySlug(slug: string): Promise<ReadonlyArray<Post>>,
    createPosts(posts: ReadonlyArray<CreatePostPayload>): Promise<void>,
}

export const postService: PostService = {
    getPostsBySlug: (slug: string) => cassandraService.post.getAllPostByBlog(slug),
    createPosts: (posts: ReadonlyArray<CreatePostPayload>) => cassandraService.post.createPosts(posts)
}
