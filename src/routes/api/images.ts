import { Router, Request } from "express";
import { valid } from "../../middleware/queryValidation";
import Image from "../../middleware/imageProcessing";
import { QueryTypes } from "../../types";

const router = Router();
const image = new Image();

router.get(
  "/images",
  valid,
  async (req: Request<unknown, unknown, unknown, QueryTypes>, res) => {
    const { filename, width, height } = req.query;

    await image.process({
      filename,
      width: Number(width),
      height: Number(height),
    });

    res.sendFile(
      image.getThumbImagePath({
        filename,
        width: Number(width),
        height: Number(height),
      })
    );
  }
);

export default router;
