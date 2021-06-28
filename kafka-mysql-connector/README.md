# Introduction
This projects has all the utility script to register and unregister kafka connectors and in particular a connector to listen to transaction logs changes and stream them to kafka


The script included in this project assumes a kafka connect acccessible through localhost:8083
The configuration of the connector also assumes a database accessible at mysqlserver:3306 inside the kafka connect with root/admin123 credentials, a testdb database createsd and a table called tasks in which all events will be captured and streamed out

# Configuration for the mysqlstreamer kafka connector

``` {
  "name": "tasks-connector",  
  "config": {  
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",  
    "database.hostname": "mysqlserver",  
    "database.port": "3306",
    "database.user": "root",
    "database.password": "admin123",
    "database.server.id": "3",  
    "database.server.name": "testserver",  
    "table.include.list": "testdb.tasks",
    "database.history.kafka.bootstrap.servers": "kafka:9092",  
    "database.history.kafka.topic": "schema-changes.tasks"  
  }
}
