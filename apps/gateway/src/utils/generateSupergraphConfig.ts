import { parse, stringify } from 'yaml';
import { readFileSync } from 'fs';
import { SUBGRAPH_AUTH_URL, SUBGRAPH_DEMO_URL } from './config';

const CONFIG_FILE = `${__dirname}/../../supergraph.yaml`;

const routingEnvMap = new Map([
  ['auth', SUBGRAPH_AUTH_URL],
  ['demo', SUBGRAPH_DEMO_URL],
]);

type SuperGraphConfig = {
  subgraphs: {
    [service: string]: {
      routing_url: string;
    };
  };
};

const updateRoutingUrls = (config: SuperGraphConfig) => {
  const subgraphEntries = Object.entries(config.subgraphs);

  const updatedSubgraphEntries = subgraphEntries.reduce<typeof subgraphEntries>(
    (acc, [name, serviceConfig]) => [
      ...acc,
      [
        name,
        {
          ...serviceConfig,
          routing_url: routingEnvMap.get(name)!,
        },
      ],
    ],
    []
  );

  return {
    ...config,
    subgraphs: Object.fromEntries(updatedSubgraphEntries),
  };
};

const file = readFileSync(CONFIG_FILE, 'utf8');

const config = parse(file);

const updatedConfig = updateRoutingUrls(config);

console.log(stringify(updatedConfig));
