import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const create = async () => {
  const fileText = "I am fresh and young";
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fresh.txt");
  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(filePath, fileText);
      console.log("file is created");
    } else {
      throw err;
    }
  }
};

await create();
