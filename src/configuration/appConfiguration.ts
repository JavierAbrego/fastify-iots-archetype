export type AppConfiguration = {
    port: number,
    cassandra: {
        host: string,
        keyspace: string,
        localDataCenter: string,
        username: string,
        password: string
    }
}
export const appConfiguration = {
    port: (process.env.PORT && Number.parseInt(process.env.PORT)) || 3000,
    cassandra: {
        host: process.env.CASSANDRA_HOST || '0.0.0.0',
        keyspace: process.env.CASSANDRA_KEYSPACE || 'app',
        localDataCenter: process.env.CASSANDRA_DC || 'datacenter1',
        username: process.env.CASSANDRA_USER || 'cassandra',
        password: process.env.CASSANDRA_PASSWORD || 'cassandra'
    }
}
