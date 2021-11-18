import fs from "fs";
import path from "path";

const baseDir = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(baseDir, "hash.txt");

const getFile = (): string => {
  const buf = fs.readFileSync(filePath);
  return buf.toString() ?? "no hash";
};

export { getFile };
