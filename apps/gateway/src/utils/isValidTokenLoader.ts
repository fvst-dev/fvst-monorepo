import DataLoader from "dataloader";
import { SUBGRAPH_AUTH_URL } from "./config";
import LRU from "lru-cache";
import { createHash } from "node:crypto";

const cache = new LRU({
  ttl: 60_000,
  max: 10000,
});

export default new DataLoader<string, boolean>(
  async (tokens) => {
    const response = await fetch(SUBGRAPH_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query IsValidToken($token: String!) {
           isValidToken(token: $token)
        }
      `,
        variables: {
          token: tokens[0],
        },
      }),
    });

    const result = await response.json();
    return [result.data.isValidToken];
  },
  {
    cache: true,
    cacheMap: cache,
    batch: false,
    cacheKeyFn: (token) => createHash("md5").update(token).digest("hex"),
  }
);
