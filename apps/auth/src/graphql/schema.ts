import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./permissions";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const typeDefs = loadSchemaSync(__dirname + "/schema/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

const schema = applyMiddleware(executableSchema, permissions);

export default schema;
