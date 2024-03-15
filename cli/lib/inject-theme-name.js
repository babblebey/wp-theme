import fs from "fs";

/**
 * Inject theme name into specific file by replacing `$cwpt` placeholders
 * @param {string} filePath 
 * @param {string} fileContent 
 * @param {string} themeName 
 */
export default function injectThemeName(filePath, fileContent, themeName) {
  fs.writeFileSync(
    filePath, 
    fileContent.replaceAll("$cwpt", themeName)
  );
}