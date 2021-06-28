echo "\nStatus of kafka-connect:"
curl -H "Accept:application/json" localhost:8083

echo '\n\nConnectiors registered in kafka-connect'
curl -H "Accept:application/json" localhost:8083/connectors/