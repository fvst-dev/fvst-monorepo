import Redis from "ioredis";
import { REDIS_URL } from "../utils/config";

let instance: Redis | undefined;

const getRedis = () => {
  if (!instance) {
    instance = new Redis(REDIS_URL);
  }

  return instance;
};

export default getRedis;
