import path from "path";
import { writeFile, access, readdir } from "fs/promises";
import sharp from "sharp";

import { QueryTypes } from "../types";

export const ASSETS_DIR_PATH = path.resolve(__dirname, "../../assets");

// retrieve thumb images path.
export const getThumbImagePath = (query: QueryTypes): string => {
  return path.resolve(
    ASSETS_DIR_PATH,
    `thumb/${query.filename}-${query.width}x${query.height}.jpg`
  );
};

// retrieve full images path.
export const getFullImagePath = (filename: string): string => {
  return path.resolve(ASSETS_DIR_PATH, `full/${filename}.jpg`);
};

export const getAllAvailableImagesNames = async (): Promise<
  string[] | null
> => {
  try {
    const files = await readdir(path.resolve(ASSETS_DIR_PATH, "full"));
    return files.map((file) => file.split(".")[0]);
  } catch (error) {
    return null;
  }
};

// check if thumb available to gain performance.
export const checkImageAvailable = async (
  query: QueryTypes
): Promise<boolean> => {
  let imageFile = null;

  if (query.width && query.height) {
    imageFile = getThumbImagePath(query);
  } else {
    imageFile = getFullImagePath(query.filename);
  }

  try {
    await access(imageFile);
    return true;
  } catch (error) {
    return false;
  }
};

// image processing function
export const process = async (query: QueryTypes): Promise<void> => {
  // first check if thumb available.
  const found = await checkImageAvailable(query);

  // only if not found will process otherwise not.
  if (!found) {
    const processed = await sharp(getFullImagePath(query.filename))
      .resize(query.width, query.height)
      .toBuffer();

    await writeFile(getThumbImagePath(query), processed);
  }
};
