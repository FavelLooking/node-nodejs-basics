import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const rename = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "wrongFilename.txt");
  const newFilePath = path.resolve(__dirname, "files", "properFilename.md");

  try {
    await fs.access(newFilePath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        await fs.access(filePath);
      } catch {
        if (err.code === "ENOENT") {
          throw new Error("FS operation failed");
        }
        throw err;
      }
      await fs.rename(filePath, newFilePath);
    } else throw err;
  }
};

await rename();
