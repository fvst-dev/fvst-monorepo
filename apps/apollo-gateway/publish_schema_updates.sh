cd $1/apps

for d in */ ; do

    if [ ! -f $d.env ]; then 
        continue; 
    fi

    APP_NAME=$(echo $d | sed 's/.$//')
    SCHEMA_FILE=$APP_NAME/src/graphql/schema/schema.graphql
    ENDPOINT_PORT=$(sed -n 's/^PORT=//p' $APP_NAME/.env)
    

    if [[ ! "$ENDPOINT_PORT" =~ ^[0-9]+$ ]] || [ ! -f "$SCHEMA_FILE" ]; then 
        continue;
    fi

    echo "=============================================================="
    echo "App $APP_NAME is configured to use port $ENDPOINT_PORT and this schema file $SCHEMA_FILE"

    rover subgraph publish $APOLLO_GRAPH_REF --routing-url http://host.docker.internal:$ENDPOINT_PORT --schema $SCHEMA_FILE --name $APP_NAME

    echo "=============================================================="
done