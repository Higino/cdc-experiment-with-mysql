curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d \
'{
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
}'
