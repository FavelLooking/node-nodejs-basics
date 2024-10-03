import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const list = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const folderPath = path.resolve(__dirname, "files");

  try {
    await fs.access(folderPath);
    const directory = await fs.readdir(folderPath);
    console.log(...directory);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await list();
