import { Router, Request, Response } from "express";
import { valid } from "../../middleware/queryValidation";
import { process, getThumbImagePath } from "../../middleware/imageProcessing";
import { QueryTypes } from "../../types";

const router = Router();

router.get(
  "/images",
  valid,
  async (
    req: Request<unknown, unknown, unknown, QueryTypes>,
    res: Response
  ): Promise<void> => {
    const { filename, width, height } = req.query;

    await process({
      filename,
      width: Number(width),
      height: Number(height),
    });

    res.sendFile(
      getThumbImagePath({
        filename,
        width: Number(width),
        height: Number(height),
      })
    );
  }
);

export default router;
