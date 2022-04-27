import {Blog} from "./blog.domain";
import {cassandraService} from "../db/cassandra/cassandra.service";

export type BlogService = {
    getBlogBySlug: (slug: string) => Promise<Blog>
    createBlog: (slug: string, name: string) => Promise<Blog>
}
export const blogService: BlogService = {
    getBlogBySlug: (slug: string): Promise<Blog> => cassandraService.blog.getBlog(slug),
    createBlog: (slug: string, name: string) => cassandraService.blog.createBlog({slug, name})
}
