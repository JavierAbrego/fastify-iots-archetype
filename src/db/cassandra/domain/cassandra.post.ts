import {types} from "cassandra-driver";

export type CassandraPost = {
    uuid: types.Uuid,
    viewCount: bigint,
    title: string,
    content: string,
    blog: string
}
