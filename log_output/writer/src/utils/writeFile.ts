import fs from "fs";
import path from "path";
import { getHash } from "./getHash";

const baseDir = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(baseDir, "hash.txt");

const writeFile = () => {
  // await new Promise((res) => fs.mkdir(baseDir, (_err) => res(true)))
  const hash = getHash();
  fs.writeFile(filePath, hash, function (err) {
    if (err) {
      console.error("huh, something went wrong", err);
    }
    console.log("writing hash to file, hash: ", hash);
  });
  setTimeout(writeFile, 5000);
};

export { writeFile };
