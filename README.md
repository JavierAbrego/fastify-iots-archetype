//db setup
docker run --name some-cassandra -d -p 9042:9042 cassandra:4

// create a new Blog while simultaneously allowing to create
// potentially multiple Posts that get connected to the new Blog.
- POST /blog
createBlog {
    blog: Blog
    posts: []
}

//query a Blog by any unique criteria. In this query it must
//optionally be possible to get the related Posts as well.
- GET /blog/{slug}?embed=posts

// create a new Post and connect it to an existing Blog.
-POST /post
createPost {
    title: string,
    content: string,
    blog(slug): string
}

// Models
Post :{
    uuid: UUID,
    title: string,
    content: string,
    viewCount: number,
    blog: string,
}

Blog: {
    slug: string,
    name: string,
}
