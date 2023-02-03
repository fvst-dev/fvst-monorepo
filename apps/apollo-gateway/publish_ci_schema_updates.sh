cd apps

for d in */ ; do
    APP_NAME=$(echo $d | sed 's/.$//')
    SCHEMA_FILE=$APP_NAME/src/graphql/schema/schema.graphql

    GRAPH_REF="fvst-main@pr-$PR_NUMBER"

    ENDPOINT="https://service-$APP_NAME-fvst-monorepo-pr-$PR_NUMBER.up.railway.app"

    if [ ! -f "$SCHEMA_FILE" ]; then 
        continue;
    fi

    echo "=============================================================="
    echo "App $APP_NAME is configured to use endpoint $ENDPOINT and this schema file $SCHEMA_FILE"

    ~/.rover/bin/rover subgraph publish $GRAPH_REF --routing-url $ENDPOINT --schema $SCHEMA_FILE --name $APP_NAME

    echo "=============================================================="
done