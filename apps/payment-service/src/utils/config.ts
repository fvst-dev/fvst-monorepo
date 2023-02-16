import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4003),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export const PORT = env.data.PORT;

export const NODE_ENV = env.data.NODE_ENV;
