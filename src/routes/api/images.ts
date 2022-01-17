import { Router, Request } from "express";
import { valid, QueryTypes } from "../../middleware/queryValidation";
import Image from "../../middleware/imageProcessing";

const router = Router();
const image = new Image();

router.get(
  "/images",
  valid,
  async (req: Request<any, any, any, QueryTypes>, res) => {
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
