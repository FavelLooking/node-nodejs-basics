import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const remove = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.access(filePath);
    await fs.rm(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await remove();
