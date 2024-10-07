import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import("./files/c.js");
import * as url from "url";
import fs from "fs/promises";

const random = Math.random();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

let unknownObject;

// if (random > 0.5) {
//   unknownObject = import("./files/a.json", { with: { type: "json" } });
// } else {
//   unknownObject = import("./files/b.json", { with: { type: "json" } });
// }

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

async function loadJson() {
  try {
    const filePath = path.join(
      __dirname,
      random > 0.5 ? "files/a.json" : "files/b.json",
    );

    const jsonText = await fs.readFile(filePath, "utf-8");

    const jsonData = JSON.parse(jsonText);

    console.log("JSON data:", jsonData);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

loadJson();

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
