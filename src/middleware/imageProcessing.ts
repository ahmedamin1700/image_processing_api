import path from "path";
import { writeFile, access } from "fs/promises";
import sharp from "sharp";

interface QueryTypes {
  filename: string;
  width?: number;
  height?: number;
}

class Image {
  // directory paths for 'full' and 'thumb'.
  private fullDirPath = path.resolve(__dirname, "../../assets/full");
  private thumbDirPath = path.resolve(__dirname, "../../assets/thumb");

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
