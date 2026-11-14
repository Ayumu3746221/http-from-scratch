import { NotFoundError } from "../errors/application";

export const openPngFile = async (filename: string) => {
  const filePath = new URL(`../photos/${filename}.png`, import.meta.url);
  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    throw new NotFoundError(`${filename}.png`);
  }
  return file;
};
