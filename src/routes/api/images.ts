import path from "path";
import { Router, Request } from "express";
import imageProcessing, { THUMB_IMG_DIR } from "../../middleware/imageProcessing";

const router = Router();

interface QueryTypes {
  filename: string;
  width: string;
  height: string;
}

router.get(
  "/images",
  async (req: Request<any, any, any, QueryTypes>, res, next) => {
    const { filename, width, height } = req.query;

    if (!(filename || width || height)) {
      return res.send(
        "Error: Input file is missing.\n The following error occured processing your image."
      );
    }

    await imageProcessing(filename, Number(width), Number(height));
    const imageFile = path.resolve(THUMB_IMG_DIR, `${filename}-thumb.jpg`);
    res.sendFile(imageFile);
  }
);

export default router;
