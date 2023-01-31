import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  SUBGRAPH_AUTH_URL: z.string().url(),
  SUBGRAPH_DEMO_URL: z.optional(z.string().url()),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export const PORT = env.data.PORT;

export const NODE_ENV = env.data.NODE_ENV;

export const SUBGRAPH_AUTH_URL = env.data.SUBGRAPH_AUTH_URL;

export const SUBGRAPH_DEMO_URL = env.data.SUBGRAPH_DEMO_URL;
