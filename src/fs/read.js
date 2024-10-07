import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const read = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fileToRead.txt");

  try {
    await fs.access(filePath);
    const text = await fs.readFile(filePath, { encoding: "utf-8" });
    console.log(text);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
