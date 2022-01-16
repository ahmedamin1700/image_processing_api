import path from "path";
import { readFile, writeFile } from "fs/promises";
import sharp from "sharp";

const FULL_IMG_DIR = path.resolve(__dirname, "../../assets/full");
export const THUMB_IMG_DIR = path.resolve(__dirname, "../../assets/thumb");

export default async (name: string, w: number, h: number) => {
  console.log(__dirname);

  const imageFile = await readFile(`${FULL_IMG_DIR}/${name}.jpg`);
  const processed = await sharp(imageFile).resize(w, h).toBuffer();

  await writeFile(`${THUMB_IMG_DIR}/${name}-thumb.jpg`, processed);
};
