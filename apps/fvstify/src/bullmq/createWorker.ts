import { Job, Worker } from "bullmq";
import debug from "debug";

const workerLogger = debug("worker");

const extendLogger = (
  logger: debug.Debugger,
  ...namespaces: (string | undefined)[]
) => namespaces.reduce((l, ns) => l.extend(ns || "-"), logger);

const registerLoggers = (worker: Worker) => {
  worker.on("completed", (job, returnValue) => {
    const log = extendLogger(workerLogger, worker.name, job.id, "completed");
    log(`Completed. Return value: %o`, returnValue);
  });

  worker.on("failed", (job, error) => {
    const log = extendLogger(workerLogger, worker.name, job?.id, "failed");
    log(`Failed. Error: %o`, error);
  });

  worker.on("progress", (job, progress) => {
    const log = extendLogger(workerLogger, worker.name, job.id, "progress");
    log(`Progress: %o`, progress);
  });

  worker.on("error", (_err) => {
    // do nothing - avoid node to exit because of unhandled error
  });
};

const createWorker = <DataType = any, ReturnType = any>(
  queueName: string,
  processorCb: (job: Job<DataType, ReturnType, string>) => Promise<ReturnType>
) => {
  const worker = new Worker<DataType, ReturnType>(queueName, processorCb);

  registerLoggers(worker);

  return worker;
};

export default createWorker;
