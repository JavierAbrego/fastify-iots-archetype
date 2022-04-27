import {auth, Client, mapping, types} from "cassandra-driver";
import {appConfiguration} from "../../configuration/appConfiguration";
import {Post} from "../../post/post.domain";
import {Blog} from "../../blog/blog.domain";
import {CreatePostPayload} from "../../post/post.routes";
import Uuid = types.Uuid;

let client:Client

function getClient(): Client {
    const {host, keyspace, localDataCenter, username, password} = appConfiguration.cassandra;
    if (!client) {
        client = new Client({
            contactPoints: [host],
            keyspace,
            localDataCenter,
            authProvider: new auth.PlainTextAuthProvider(username, password),
        });
    }
    return client
}

function createMapper(mappingOptions: mapping.MappingOptions) {
    return new mapping.Mapper(getClient(), mappingOptions);
}

const postMapper = createMapper({
    models: {
        Post: {
            tables: ['post'],
            mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
    },
}).forModel('Post')

const blogMapper = createMapper({
    models: {
        Blog: {
            tables: ['blog'],
            mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
    },
}).forModel('Blog')

async function getAllPostByBlog(blog: string) {
    return (await postMapper.find({blog})).toArray()
}

async function createPosts(posts: ReadonlyArray<CreatePostPayload>):Promise<void> {
    const inserts = posts.map(
        (createPostItem) =>
            postMapper.insert(
                {
                    ...createPostItem,
                    uuid: Uuid.random(),
                    viewCount: types.Long.fromNumber(0)
                })
    )
   await Promise.all(inserts)
}

async function createBlog(blog: Blog) {
    await blogMapper.insert(blog)
    return blog
}

async function getBlog(slug: string){
    return (await blogMapper.find({slug})).first()
}

export const cassandraService = {
    blog:{
        getBlog,
        createBlog,
    },
    post:{
        createPosts,
        getAllPostByBlog
    }
}


