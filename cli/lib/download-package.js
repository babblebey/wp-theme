import { cancel } from "@clack/prompts";
import { downloadTemplate } from "giget";

/**
 * Download Package from the cwpt repository's `package` directory 
 * @param {string} packageSubdir 
 * @param {string} targetDir 
 * @returns {Promise<{dir: string, source: string}>}
 */
export default async function downloadCWPTPackage(packageSubdir, targetDir) {
  try {
    const { dir, source } = await downloadTemplate(`github:babblebey/create-wp-theme/packages/${packageSubdir}#main`, {
      dir: targetDir,
      repo: "babblebey/create-wp-theme",
      force: true,
      cwd: "."
    });
  
    return { dir, source };
  } catch (error) {
    if (error instanceof Error) {
      cancel(error.message);
      process.exit(1);
    } else {
      cancel("Unable to download package");
      process.exit(1);
    }
  }
}