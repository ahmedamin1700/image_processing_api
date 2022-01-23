import path from "path";
import { writeFile, access, readdir, mkdir } from "fs/promises";
import sharp from "sharp";

import { QueryTypes } from "../types";

export const ASSETS_DIR_PATH = path.resolve(__dirname, "../../assets");

export const initImageDirs = async (): Promise<void> => {
  // first check if full images dir available if not create it.
  try {
    await access(path.resolve(ASSETS_DIR_PATH, "full"));
  } catch (error) {
    await mkdir(path.resolve(ASSETS_DIR_PATH, "full"));
  }

  // second check if thumb images dir available if not create it.
  try {
    await access(path.resolve(ASSETS_DIR_PATH, "thumb"));
  } catch (error) {
    await mkdir(path.resolve(ASSETS_DIR_PATH, "thumb"));
  }
};

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
export const process = async (query: QueryTypes): Promise<boolean> => {
  // first check if thumb available.
  const found = await checkImageAvailable(query);

  if (found) return true;

  // only if not found will process otherwise not.
  if (!found && query.width && query.height) {
    const processed = await sharp(getFullImagePath(query.filename))
      .resize(parseInt(query.width), parseInt(query.height))
      .toBuffer();
    try {
      await writeFile(getThumbImagePath(query), processed);

      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
};
