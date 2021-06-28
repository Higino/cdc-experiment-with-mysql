# Introduction
An experiment to test how we can capture data changes from a mysql database to a kafka infrastructure

Testing data streaming extraction from a mysql database

# Client
A component that will create the mysqldatamodel and randomly popuates users and tasks tables in mysqldatabase


# MySql Server
A mysqlserver server with custom configuration so kafka connector can connect to it out-of-the-box 

# Kafka Server
A kafka server that will be used to store streamed data from mysqlserver

# Kafka ui
A simple userinterface so we can see what is being sent to kafka

# Future work
Create a kafka consumer to get the data being streamned out of mysql and plot it into a dashboard
