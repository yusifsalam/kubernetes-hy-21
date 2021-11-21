import { FastifyPluginAsync } from "fastify";
import fs from "fs";
import { getImage, imagePath } from "../utils/getImage";

const imageRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/randomImage", async (_req, res) => {
    await getImage();
    const buf = fs.readFileSync(imagePath);
    res.type("image/png");
    res.send(buf);
  });
};

export default imageRoutes;
