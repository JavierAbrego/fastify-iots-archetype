import * as t from 'io-ts'
export const Blog = t.type({
    slug: t.string,
    name: t.string
})

export type Blog = t.TypeOf<typeof Blog>

