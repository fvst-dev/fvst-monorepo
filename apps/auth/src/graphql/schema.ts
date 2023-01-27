import resolvers from "./resolvers";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./permissions";
import { loadSchemaSync } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { buildSubgraphSchema } from "@apollo/subgraph";

const allSchemas = loadSchemaSync(__dirname + "/schema/*.graphql", {
  loaders: [new GraphQLFileLoader()],
  // this is needed to support loading federation with @link directive
  assumeValidSDL: true,
});

const typeDefs = mergeTypeDefs([...scalarTypeDefs, allSchemas]);

const executableSchema = buildSubgraphSchema([
  { typeDefs: typeDefs, resolvers },
]);

const schema = applyMiddleware(executableSchema, permissions);

export default schema;
