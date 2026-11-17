import { InvalidRequestError, NotFoundError } from "../errors/application";

const MAX_FILE_PIXEL = 1980 * 1080;

export const openPngFile = async (filename: string) => {
  const filePath = new URL(`../photos/${filename}.png`, import.meta.url);
  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    throw new NotFoundError(`${filename}.png`);
  }
  return file;
};

export const writePngFile = async (bytes: Uint8Array, fileName: string): Promise<boolean> => {
  const image = new Bun.Image(bytes);
  const { width, height, format } = await image.metadata();
  const pixel = width * height;

  if (format !== "png") {
    throw new InvalidRequestError("png", format);
  }

  if (pixel <= MAX_FILE_PIXEL) {
    throw new InvalidRequestError("1980 * 1080 or smaller", pixel.toString());
  }

  const filePath = new URL(`../photos/${fileName}.png`, import.meta.url);
  const file = Bun.file(filePath);

  if (await file.exists()) {
    throw new InvalidRequestError("No exist", "Always exist");
  }

  await file.write(bytes);

  return true;
};
