import { Queue } from "bullmq";
import getRedis from "../redis/client";
import debug from "debug";

const queueLogger = debug("queue");

const queues = new Map<string, Queue>();
const getQueue = (name: string = "default") => {
  const existingQueue = queues.get(name);
  if (existingQueue) {
    return existingQueue;
  }

  const queue = new Queue(name, { connection: getRedis() });
  queues.set(name, queue);

  const log = queueLogger.extend(name);
  const logWaiting = log.extend("waiting");
  const logError = log.extend("error");
  queue.on("waiting", (job) => {
    logWaiting("%o", job);
  });
  queue.on("error", (job) => {
    logError("%o", job);
  });

  return queue;
};

export default getQueue;
