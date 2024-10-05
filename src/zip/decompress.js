import fs from "fs";
import path from "path";
import * as url from "url";
import { createGunzip } from "zlib";
import { pipeline } from "stream";

const decompress = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const compressedFilePath = path.resolve(__dirname, "files", "archive.gz");
  const originalFilePath = path.resolve(
    __dirname,
    "files",
    "fileToCompress.txt",
  );

  const gunzip = createGunzip();
  const source = fs.createReadStream(compressedFilePath);
  const destination = fs.createWriteStream(originalFilePath);

  pipeline(source, gunzip, destination, (err) => {
    if (err) {
      console.error("Error:", err);
      process.exitCode = 1;
    } else {
      console.log("Files were decompressed");
      fs.unlink(compressedFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error:", unlinkErr);
        }
      });
    }
  });
};

await decompress();
