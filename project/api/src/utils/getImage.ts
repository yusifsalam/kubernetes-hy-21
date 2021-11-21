import fs, { writeFileSync } from "fs";
import path from "path";
const fetch = require("node-fetch");

const dir = path.join("/", "usr", "src", "app", "files");
// const dir = path.join(process.cwd(), "public");
const filePath = path.join(dir, "lastUpdated.txt");
const imagePath = path.join(dir, "image.jpg");

/* checks whether a text file containing today's date exists,
 meaning today's image is already cached
*/
const fileAlreadyExists = (): boolean => {
  const todayString = new Date().toISOString().split("T")[0];
  let textContents = "";
  try {
    textContents = fs.readFileSync(filePath).toString();
  } catch (err) {
    console.error(err);
    fs.writeFileSync(filePath, "");
  }

  return todayString === textContents;
};

const getImage = async () => {
  if (fileAlreadyExists()) return;
  try {
    console.log("fetching file from the API");
    const res = await fetch("https://picsum.photos/1200");
    await res.body?.pipe(fs.createWriteStream(imagePath));
    const todayString = new Date().toISOString().split("T")[0];
    writeFileSync(filePath, todayString);
  } catch (err) {
    console.error(err);
  }
};

export { getImage, imagePath };
