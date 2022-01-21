import { Request, Response, NextFunction } from "express";
import Image from "./imageProcessing";

import { QueryTypes } from "../types";

const image = new Image();

// validation middleware for request query.
export const valid = async (
  req: Request<unknown, unknown, unknown, QueryTypes>,
  res: Response,
  next: NextFunction
) => {
  if (!(await image.checkImageAvailable({ filename: req.query.filename }))) {
    return res.send("Error: file missing from full dir.");
  } else if (!req.query.width || !req.query.height) {
    return res.send("Error: resizing dimension not available.");
  } else return next();
};
