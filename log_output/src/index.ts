import { v4 as uuid } from "uuid";

const getHash = () => {
  console.log(new Date().toISOString() + " " + uuid());
  setTimeout(getHash, 5000);
};

getHash();
