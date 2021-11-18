import { v4 as uuid } from "uuid";

const getHash = (): string => {
  return new Date().toISOString() + " " + uuid();
};

export { getHash };
