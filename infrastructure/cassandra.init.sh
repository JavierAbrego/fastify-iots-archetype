CQL="
CREATE KEYSPACE app WITH durable_writes = true AND replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
create table app.post
(
    uuid UUID,
    title text,
    content text,
    view_count bigint,
    blog text,
    PRIMARY KEY (uuid)
);
create table app.blog
(
    slug text,
    name text,
    PRIMARY KEY (slug)
);
"

until echo $CQL | cqlsh; do
  echo "cqlsh: Cassandra is unavailable to initialize - will retry later"
  sleep 2
done &

exec /docker-entrypoint.sh "$@"
