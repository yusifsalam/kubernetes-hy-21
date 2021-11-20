import fs from "fs";
import path from "path";

const baseDir = path.join("/", "usr", "src", "app", "files");

const getFile = (filename: string): string => {
  const filePath = path.join(baseDir, filename);
  const buf = fs.readFileSync(filePath);
  return buf.toString() ?? "no hash";
};

const getHash = () => {
  return getFile("hash.txt");
};

const getPongs = () => {
  return getFile("pongs.txt");
};

export { getFile, getHash, getPongs };
