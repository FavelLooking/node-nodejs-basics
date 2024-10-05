import fs from "fs";
import path from "path";
import * as url from "url";

const write = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fileToWrite.txt");

  const writeStream = fs.createWriteStream(filePath);

  process.stdin.pipe(writeStream);
};

await write();
