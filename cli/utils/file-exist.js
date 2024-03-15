import fs from "fs";

/**
 * Checks if theme file name already exists in target directory
 * @param {fs.PathLike} filePath 
 * @returns {boolean}
 */
export function fileExists(filePath) {
  return fs.existsSync(filePath);
}