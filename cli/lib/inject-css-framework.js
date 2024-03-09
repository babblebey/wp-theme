import fs from "fs";

/**
 * Inject css framework into specific file by replacing `$cssFramework` placeholders
 * @param {string} filePath 
 * @param {string} fileContent 
 * @param {string} cssFramework 
 */
export default function injectCSSFramework(filePath, fileContent, cssFramework) {
  fs.writeFileSync(
    filePath,
    fileContent.replaceAll("$cssFramework", cssFramework)
  );
}