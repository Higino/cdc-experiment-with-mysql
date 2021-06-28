docker run -it --rm --name watcher --link zookeeper:zookeeper --link kafka:kafka debezium/kafka:1.5 watch-topic -a -k testdb.testdb.tasks
