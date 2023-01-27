import { NODE_ENV, SUBGRAPH_AUTH_URL, SUBGRAPH_DEMO_URL } from "./config";
import { readFileSync } from "fs";
import { IntrospectAndCompose } from "@apollo/gateway";

const getSupergraphSdl = () => {
  if (NODE_ENV === "production") {
    return readFileSync(__dirname + "/../../supergraph.graphql").toString();
  }

  return new IntrospectAndCompose({
    subgraphs: [
      { name: "auth", url: SUBGRAPH_AUTH_URL },
      { name: "demo", url: SUBGRAPH_DEMO_URL },
    ].filter((g) => g.url),
    logger: console,
    pollIntervalInMs: 1000,
  });
};

export default getSupergraphSdl;
