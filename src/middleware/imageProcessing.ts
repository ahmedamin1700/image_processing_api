import path from "path";
import { writeFile, access, readdir } from "fs/promises";
import sharp from "sharp";

import { QueryTypes } from "../types";

class Image {
  // directory paths for 'full' and 'thumb'.
  fullDirPath = path.resolve(__dirname, "../../assets/full");
  thumbDirPath = path.resolve(__dirname, "../../assets/thumb");

  // retrieve thumb images path.
  getThumbImagePath(query: QueryTypes): string {
    return path.resolve(
      this.thumbDirPath,
      `${query.filename}-${query.width}x${query.height}.jpg`
    );
  }

  // retrieve full images path.
  getFullImagePath(filename: string): string {
    return path.resolve(this.fullDirPath, `${filename}.jpg`);
  }

  async getAllAvailableImagesNames(): Promise<string[] | null> {
    try {
      const files = await readdir(this.fullDirPath);
      return files.map((file) => file.split(".")[0]);
    } catch (error) {
      return null;
    }
  }

  // check if thumb available to gain performance.
  async checkImageAvailable(query: QueryTypes): Promise<boolean> {
    let imageFile = null;

    if (query.width && query.height) {
      imageFile = this.getThumbImagePath(query);
    } else {
      imageFile = this.getFullImagePath(query.filename);
    }

    try {
      await access(imageFile);
      return true;
    } catch (error) {
      return false;
    }
  }

  // image processing function
  async process(query: QueryTypes): Promise<void> {
    // first check if thumb available.
    const found = await this.checkImageAvailable(query);

    // only if not found will process otherwise not.
    if (!found) {
      const processed = await sharp(this.getFullImagePath(query.filename))
        .resize(query.width, query.height)
        .toBuffer();

      await writeFile(
        `${this.thumbDirPath}/${query.filename}-${query.width}x${query.height}.jpg`,
        processed
      );
    }
  }
}

export default Image;
