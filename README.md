# Introduction
An experiment to test how we can capture data changes from a mysql database to a kafka infrastructure

Testing data streaming extraction from a mysql database directly from the transaction logs using kafka connectors for mysql. All insert, update, delete statements will trigger messages to be send to kafka with the following rough schema:
``` 
{ before: {a json object with the state of all the columns before the operation was commited}
  after: {an json object with the state of all the columns after the opearation was commited }
```

# How to use this
```
$ git clone (this repo)
$ cd (this repo)
$ docker compose up
$ cd kafka-mysql-connector
$ ./register-testdbtasks-connector.sh
$ cd ../tasks-test-client
$ npm i && node index.js
```
and star watching all the changes in db happening in near realtime in the akfka ui topic testserver.testdb.tasks (by going to http://localhost:9000)

# Project architecture
![CDC Experiment Architecture](https://user-images.githubusercontent.com/19814911/123683329-fd5bea80-d843-11eb-9ab0-c44f0f9bb31d.jpeg)



## Tasks data generator (aka Client)
A component that will create the mysqldatamodel and randomly popuates users and tasks tables in mysqldatabase


## MySql Server
A mysqlserver server with custom configuration so kafka connector can connect to it out-of-the-box 

## Kafka Server
A kafka server that will be used to store streamed data from mysqlserver

## Kafka ui
A simple userinterface so we can see what is being sent to kafka

## Future work
- Create a kafka consumer to get the data being streamned out of mysql and plot it into a dashboard
- Implement filtering in the streaming (i.e, only stream tasks whose user signed a GDPR agreement (users who's user id is odd for example). Reference here: https://debezium.io/documentation/reference/configuration/filtering.html
