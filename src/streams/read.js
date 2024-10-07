import fs from "fs";
import path from "path";
import * as url from "url";

const read = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fileToRead.txt");

  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });

  fileStream.on("data", (chunk) => {
    process.stdout.write(chunk);
    process.stdin.once("data", () => {
      process.exit();
    });
  });
  fileStream.on("error", (err) => {
    console.error("Error:", err);
  });
};

await read();
