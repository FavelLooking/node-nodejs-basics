import { spawn } from "child_process";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const filePath = path.resolve(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [filePath, ...args]);
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2", "someArgument3"]);
