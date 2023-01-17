import { z } from "zod";

const envSchema = z.object({
  REDIS_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

export const REDIS_URL = env.data.REDIS_URL;

export const NODE_ENV = env.data.NODE_ENV;
