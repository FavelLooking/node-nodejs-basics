import fs from "fs";
import crypto, { createHash } from "crypto";
import path from "path";
import * as url from "url";

const calculateHash = async () => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const filePath = path.resolve(
    __dirname,
    "files",
    "fileToCalculateHashFor.txt",
  );
  try {
    const fileHash = createHash("sha256");

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("data", (chunk) => {
      fileHash.update(chunk);
    });

    fileStream.on("end", () => {
      const resultHash = fileHash.digest("hex");
      console.log("Result file hash:", resultHash);
    });

    fileStream.on("error", (err) => {
      console.error("Error reading:", err);
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

await calculateHash();
