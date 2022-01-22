import { Request, Response, NextFunction } from "express";
import { checkImageAvailable } from "./imageProcessing";

import { QueryTypes } from "../types";

// validation middleware for request query.
export const valid = async (
  req: Request<unknown, unknown, unknown, QueryTypes>,
  res: Response,
  next: NextFunction
) => {
  const { filename, width, height } = req.query;
  if (
    !(await checkImageAvailable({
      filename: filename,
      width: null,
      height: null,
    }))
  ) {
    return res.send("Error: file missing from full dir.");
  } else if (width && height) {
    if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
      return res.send("Error: dimensions must be a valid number.");
    }
    return next();
  } else return next();
};
