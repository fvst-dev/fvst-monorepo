cd apps

for d in */ ; do
    APP_NAME=$(echo $d | sed 's/.$//')
    SCHEMA_FILE=$APP_NAME/src/graphql/schema/schema.graphql

    BRANCH_OR_PR="pr-21"

    GRAPH_REF="fvst-main@$BRANCH_OR_PR"

    ENDPOINT="https://$APP_NAME-fvst-monorepo-$BRANCH_OR_PR.up.railway.app"


    if [ ! -f "$SCHEMA_FILE" ]; then 
        continue;
    fi

    echo "=============================================================="
    echo "App $APP_NAME is configured to use endpoint $ENDPOINT and this schema file $SCHEMA_FILE"

    ~/.rover/bin/rover subgraph publish $GRAPH_REF --routing-url $ENDPOINT--schema $SCHEMA_FILE --name $APP_NAME

    echo "=============================================================="
done