import fs from "fs";
import path from "path";
import * as url from "url";
import { createGzip } from "zlib";
import { pipeline } from "stream";

const compress = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fileToCompress.txt");
  const newFilePath = path.resolve(__dirname, "files", "archive.gz");

  const gzip = createGzip();
  const source = fs.createReadStream(filePath);
  const destination = fs.createWriteStream(newFilePath);
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("Error:", err);
      process.exitCode = 1;
    } else {
      console.log("success");
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error:", unlinkErr);
        }
      });
    }
  });
};

await compress();
