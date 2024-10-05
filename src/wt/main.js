import { Worker } from "worker_threads";
import * as url from "url";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const filePath = path.resolve(__dirname, "worker.js");
const coreNumber = Number(process.env.NUMBER_OF_PROCESSORS) || 4;
let resultArr = Array(coreNumber).fill(null);

const performCalculations = async (coreNumber) => {
  const workerPromises = [];
  for (let i = 0; i < coreNumber; i += 1) {
    workerPromises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(filePath, {
          workerData: 10 + i,
        });

        worker.on("message", (data) => {
          resultArr[i] = {
            status: "resolved",
            data,
          };
          resolve();
        });

        worker.on("error", (err) => {
          resultArr[i] = {
            status: "error",
            data: null,
          };
          reject(err);
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            const resultObj = {
              status: "error",
              data: null,
            };
            resultArr[i] = resultObj;
          }
        });
      }),
    );
  }
  await Promise.all(workerPromises);
  console.log(resultArr);
};

await performCalculations(coreNumber);
