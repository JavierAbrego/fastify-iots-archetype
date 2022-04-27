import * as t from 'io-ts'

export const Post = t.type({
    uuid: t.string,
    title: t.string,
    content: t.string,
    viewCount: t.number,
    blog: t.string
})

export type Post = t.TypeOf<typeof Post>
