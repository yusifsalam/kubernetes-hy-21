import fs from "fs";
import path from "path";

const baseDir = path.join("/", "usr", "src", "app", "files");

const writePongsToFile = async (fileName: string, count: number) => {
  const filePath = path.join(baseDir, fileName);
  fs.writeFileSync(filePath, count.toString());
  console.log("writing ping count to file, pongs: ", count);
};

export { writePongsToFile };
