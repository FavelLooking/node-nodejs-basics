import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const copy = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const folderPath = path.resolve(__dirname, "files");
  const newFolderPath = path.resolve(__dirname, "files_copy");
  try {
    await fs.access(newFolderPath);

    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        await fs.access(folderPath);
        await fs.cp(folderPath, newFolderPath, { recursive: true });
        console.log("Folder copied successfully");
      } catch (err) {
        throw new Error("FS operation failed");
      }
    } else {
      throw err;
    }
  }
};

await copy();
